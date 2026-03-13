import type { DirectorBrief, Tier } from '@/types'

type RenderJob = {
  videoId: string
  brief: DirectorBrief
  screenshotUrls: string[]
  styleMode: 'dark' | 'light'
  tier: Tier
}

type RenderResponse = {
  job_id: string
  status: string
  position: number
}

type RenderStatusResponse = {
  job_id: string
  status: 'queued' | 'rendering' | 'complete' | 'failed'
  progress_percent: number
  current_scene?: number
  video_url?: string
  error?: string
  render_time_seconds?: number
}

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  const secret = process.env.REMOTION_RENDER_SERVER_SECRET
  if (secret) headers['x-render-secret'] = secret
  return headers
}

export async function triggerRender(job: RenderJob): Promise<string> {
  const renderServerUrl = process.env.REMOTION_RENDER_SERVER_URL

  if (!renderServerUrl) {
    console.warn('REMOTION_RENDER_SERVER_URL not set — returning mock job ID')
    return job.videoId
  }

  const response = await fetch(`${renderServerUrl}/render`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      video_id: job.videoId,
      brief: job.brief,
      screenshot_urls: job.screenshotUrls,
      style_mode: job.styleMode,
      tier: job.tier,
    }),
    signal: AbortSignal.timeout(30_000),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Render server responded with ${response.status}: ${text}`)
  }

  const data: RenderResponse = await response.json()
  return data.job_id
}

export async function getRenderStatus(jobId: string): Promise<RenderStatusResponse> {
  const renderServerUrl = process.env.REMOTION_RENDER_SERVER_URL

  if (!renderServerUrl) {
    return {
      job_id: jobId,
      status: 'complete',
      progress_percent: 100,
      video_url: `videos/${jobId}.mp4`,
      render_time_seconds: 0,
    }
  }

  const response = await fetch(`${renderServerUrl}/status/${jobId}`, {
    method: 'GET',
    headers: getHeaders(),
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) {
    throw new Error(`Render status check failed with ${response.status}`)
  }

  return response.json()
}
