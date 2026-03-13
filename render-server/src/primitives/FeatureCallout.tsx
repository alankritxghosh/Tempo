import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'

const { fontFamily: interFamily } = loadInter('normal', {
  weights: ['400'],
  subsets: ['latin'],
})

type FeatureCalloutProps = {
  text: string
  lineColor?: string
  textColor?: string
  delayFrames?: number
}

export const FeatureCallout: React.FC<FeatureCalloutProps> = ({
  text,
  lineColor = '#0A84FF',
  textColor = '#FFFFFF',
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delayFrames)

  const lineSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  })

  const lineScaleX = interpolate(lineSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  const textDelay = Math.round(0.3 * fps)
  const textLocalFrame = Math.max(0, localFrame - textDelay)

  const textSpring = spring({
    frame: textLocalFrame,
    fps,
    config: { damping: 200 },
  })

  const textOpacity = interpolate(textSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: 120,
          height: 2,
          backgroundColor: lineColor,
          transform: `scaleX(${lineScaleX})`,
          transformOrigin: 'left',
        }}
      />
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 28,
          fontWeight: 400,
          color: textColor,
          opacity: textOpacity,
          letterSpacing: '0.02em',
          textAlign: 'center',
          maxWidth: '70%',
        }}
      >
        {text}
      </span>
    </div>
  )
}
