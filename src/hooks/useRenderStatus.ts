'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const RENDER_POLL_INTERVAL_MS = 3000

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
  const failCountRef = useRef(0)

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
      failCountRef.current++
      if (failCountRef.current >= 3) console.warn('[useRenderStatus] Multiple consecutive poll failures')
    }
  }, [jobId, videoId])

  useEffect(() => {
    if (!jobId || !videoId) return
    poll()
    intervalRef.current = setInterval(poll, RENDER_POLL_INTERVAL_MS)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [jobId, videoId, poll])

  return status
}
