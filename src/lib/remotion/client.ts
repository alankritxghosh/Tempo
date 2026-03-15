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
