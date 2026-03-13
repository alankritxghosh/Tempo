'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type RenderStatus = {
  status: 'pending' | 'rendering' | 'complete' | 'failed'
  progress: number
  current_scene?: number
  video_url?: string
  render_time_seconds?: number
}

export function useRenderStatus(jobId: string | null, videoId: string | null) {
  const [status, setStatus] = useState<RenderStatus>({
    status: 'pending',
    progress: 0,
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const poll = useCallback(async () => {
    if (!jobId || !videoId) return
    try {
      const response = await fetch(`/api/render-status?job_id=${jobId}&video_id=${videoId}`)
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
        if (data.status === 'complete' || data.status === 'failed') {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }
    } catch {
      // silently retry on next poll
    }
  }, [jobId, videoId])

  useEffect(() => {
    if (!jobId || !videoId) return
    poll()
    intervalRef.current = setInterval(poll, 3000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [jobId, videoId, poll])

  return status
}
