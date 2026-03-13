import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'
import { loadFont } from '@remotion/google-fonts/PlusJakartaSans'

const { fontFamily } = loadFont('normal', {
  weights: ['700'],
  subsets: ['latin'],
})

type CTALockProps = {
  text: string
  color?: string
  fontSize?: number
  delayFrames?: number
}

export const CTALock: React.FC<CTALockProps> = ({
  text,
  color = '#FFFFFF',
  fontSize = 56,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame()

  const localFrame = Math.max(0, frame - delayFrames)

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
          fontWeight: 700,
          color,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center',
          maxWidth: '80%',
          opacity,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </div>
  )
}
