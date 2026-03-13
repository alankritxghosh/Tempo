import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

type SceneFadeProps = {
  children: React.ReactNode
}

export const SceneFade: React.FC<SceneFadeProps> = ({ children }) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  const fadeInOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  )

  const opacity = Math.min(fadeInOpacity, fadeOutOpacity)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity,
      }}
    >
      {children}
    </div>
  )
}
