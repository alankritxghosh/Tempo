import express from 'express'
import cors from 'cors'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import os from 'os'

import { DirectorBriefSchema } from './types'
import type { RenderJobRequest, RenderJobStatus } from './types'
import type { TempoVideoProps } from './compositions/TempoVideo'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const PORT = parseInt(process.env.PORT ?? '3001', 10)
const RENDER_SECRET = process.env.REMOTION_RENDER_SERVER_SECRET ?? ''
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID ?? ''
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID ?? ''
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY ?? ''
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME ?? 'tempo-videos'

const MAX_CONCURRENT_RENDERS = 2

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

const jobs = new Map<string, RenderJobStatus>()
let activeRenders = 0
const renderQueue: Array<{
  jobId: string
  props: TempoVideoProps
  tier: 'free' | 'pro'
  videoId: string
}> = []

let bundlePath: string | null = null

async function ensureBundle(): Promise<string> {
  if (bundlePath) return bundlePath

  console.log('[render] Bundling Remotion project...')
  const entryPoint = path.resolve(__dirname, '..', 'src', 'index.ts')

  bundlePath = await bundle({
    entryPoint,
    onProgress: (percent: number) => {
      if (percent % 25 === 0) console.log(`[bundle] ${percent}%`)
    },
  })

  console.log('[render] Bundle ready:', bundlePath)
  return bundlePath
}

async function processRender(
  jobId: string,
  props: TempoVideoProps,
  tier: 'free' | 'pro',
  videoId: string
) {
  const startTime = Date.now()

  try {
    activeRenders++
    jobs.set(jobId, {
      job_id: jobId,
      status: 'rendering',
      progress_percent: 0,
      current_scene: 0,
    })

    const bundled = await ensureBundle()

    const composition = await selectComposition({
      serveUrl: bundled,
      id: 'TempoVideo',
      inputProps: props,
    })

    const outputDir = path.join(os.tmpdir(), `tempo-render-${jobId}`)
    fs.mkdirSync(outputDir, { recursive: true })
    const outputPath = path.join(outputDir, `${videoId}.mp4`)

    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: props,
      onProgress: ({ progress }) => {
        const current = jobs.get(jobId)
        if (current) {
          const sceneIndex = Math.min(
            Math.floor(progress * props.brief.scenes.length),
            props.brief.scenes.length - 1
          )
          jobs.set(jobId, {
            ...current,
            progress_percent: Math.round(progress * 100),
            current_scene: sceneIndex,
          })
        }
      },
    })

    const videoBuffer = fs.readFileSync(outputPath)
    const r2Key = `videos/${videoId}.mp4`

    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: r2Key,
        Body: videoBuffer,
        ContentType: 'video/mp4',
      })
    )

    const renderTime = (Date.now() - startTime) / 1000

    jobs.set(jobId, {
      job_id: jobId,
      status: 'complete',
      progress_percent: 100,
      video_url: r2Key,
      render_time_seconds: Math.round(renderTime * 10) / 10,
    })

    console.log(`[render] Job ${jobId} complete in ${renderTime.toFixed(1)}s`)

    fs.rmSync(outputDir, { recursive: true, force: true })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown render error'
    console.error(`[render] Job ${jobId} failed:`, error)

    jobs.set(jobId, {
      job_id: jobId,
      status: 'failed',
      progress_percent: 0,
      error,
    })
  } finally {
    activeRenders--
    processQueue()
  }
}

function processQueue() {
  while (activeRenders < MAX_CONCURRENT_RENDERS && renderQueue.length > 0) {
    const next = renderQueue.shift()!
    processRender(next.jobId, next.props, next.tier, next.videoId)
  }
}

function validateSecret(req: express.Request, res: express.Response): boolean {
  if (!RENDER_SECRET) return true

  const provided = req.headers['x-render-secret'] as string | undefined
  if (provided !== RENDER_SECRET) {
    res.status(401).json({ error: 'Invalid render secret' })
    return false
  }
  return true
}

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    active_renders: activeRenders,
    queued: renderQueue.length,
    max_concurrent: MAX_CONCURRENT_RENDERS,
  })
})

app.post('/render', (req, res) => {
  if (!validateSecret(req, res)) return

  const body = req.body as RenderJobRequest

  const briefResult = DirectorBriefSchema.safeParse(body.brief)
  if (!briefResult.success) {
    res.status(400).json({
      error: 'Invalid director brief',
      details: briefResult.error.issues,
    })
    return
  }

  if (
    !body.screenshot_urls ||
    !Array.isArray(body.screenshot_urls) ||
    body.screenshot_urls.length < 1
  ) {
    res.status(400).json({ error: 'screenshot_urls must be a non-empty array' })
    return
  }

  const tier = body.tier === 'pro' ? 'pro' : 'free'
  const videoId = body.video_id || uuidv4()
  const jobId = uuidv4()

  const props: TempoVideoProps = {
    brief: briefResult.data,
    screenshotUrls: body.screenshot_urls,
    tier,
  }

  jobs.set(jobId, {
    job_id: jobId,
    status: 'queued',
    progress_percent: 0,
  })

  if (activeRenders < MAX_CONCURRENT_RENDERS) {
    processRender(jobId, props, tier, videoId)
  } else {
    renderQueue.push({ jobId, props, tier, videoId })
  }

  res.json({
    job_id: jobId,
    status: 'queued',
    position: renderQueue.length,
  })
})

app.get('/status/:jobId', (req, res) => {
  if (!validateSecret(req, res)) return

  const job = jobs.get(req.params.jobId)
  if (!job) {
    res.status(404).json({ error: 'Job not found' })
    return
  }

  res.json(job)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[tempo-render] Listening on port ${PORT}`)
  console.log(`[tempo-render] Max concurrent renders: ${MAX_CONCURRENT_RENDERS}`)

  ensureBundle().catch((err) => {
    console.error('[tempo-render] Failed to pre-build bundle:', err)
  })
})
