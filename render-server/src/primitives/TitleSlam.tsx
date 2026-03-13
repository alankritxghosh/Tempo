import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { loadFont } from '@remotion/google-fonts/PlusJakartaSans'

const { fontFamily } = loadFont('normal', {
  weights: ['800'],
  subsets: ['latin'],
})

type TitleSlamProps = {
  text: string
  color?: string
  fontSize?: number
  delayFrames?: number
}

export const TitleSlam: React.FC<TitleSlamProps> = ({
  text,
  color = '#FFFFFF',
  fontSize = 96,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delayFrames)

  const springProgress = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 200, damping: 10 },
  })

  const scale = interpolate(springProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  const opacity = interpolate(localFrame, [0, 6], [0, 1], {
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
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight: 800,
          color,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          textAlign: 'center',
          maxWidth: '80%',
          opacity,
          transform: `scale(${scale})`,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </div>
  )
}
