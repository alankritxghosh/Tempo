import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { loadFont } from '@remotion/google-fonts/PlusJakartaSans'

const { fontFamily } = loadFont('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
})

type WordRevealProps = {
  text: string
  color?: string
  fontSize?: number
  fontWeight?: '700' | '800'
  delayFrames?: number
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  color = '#FFFFFF',
  fontSize = 72,
  fontWeight = '800',
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const words = text.trim().split(/\s+/)
  const staggerFrames = Math.round(0.2 * fps)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: fontSize * 0.3,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delayFrames + i * staggerFrames
        const localFrame = Math.max(0, frame - wordDelay)

        const springProgress = spring({
          frame: localFrame,
          fps,
          config: { damping: 200 },
        })

        const opacity = interpolate(springProgress, [0, 1], [0, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        })

        const translateY = interpolate(springProgress, [0, 1], [20, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        })

        return (
          <span
            key={i}
            style={{
              fontFamily,
              fontSize,
              fontWeight,
              color,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              opacity,
              transform: `translateY(${translateY}px)`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        )
      })}
    </div>
  )
}
