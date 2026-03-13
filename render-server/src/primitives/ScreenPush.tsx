import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from 'remotion'

type ScreenPushProps = {
  screenshotUrl: string
  delayFrames?: number
}

export const ScreenPush: React.FC<ScreenPushProps> = ({
  screenshotUrl,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delayFrames)

  const springProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  })

  const translateY = interpolate(springProgress, [0, 1], [200, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  const scale = interpolate(springProgress, [0, 1], [1.0, 1.2], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Img
        src={screenshotUrl}
        style={{
          width: '80%',
          height: 'auto',
          maxHeight: '85%',
          objectFit: 'cover',
          borderRadius: 12,
          transform: `translateY(${translateY}px) scale(${scale})`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  )
}
