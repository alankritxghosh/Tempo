import React from 'react'
import { Composition } from 'remotion'
import { TempoVideo, calculateTempoMetadata } from './compositions/TempoVideo'
import type { TempoVideoProps } from './compositions/TempoVideo'

const defaultProps: TempoVideoProps = {
  brief: {
    scenes: [
      {
        scene_type: 'hook',
        duration_seconds: 5,
        elements: [
          { type: 'TitleSlam', text: 'Ship Faster Than Ever' },
          { type: 'WordReveal', text: 'Build deploy iterate', delay_seconds: 1.5 },
        ],
      },
      {
        scene_type: 'product_reveal',
        duration_seconds: 8,
        elements: [
          { type: 'ScreenPush', screenshot_index: 0 },
          { type: 'FeatureCallout', text: 'Lightning-fast deployments', delay_seconds: 2 },
        ],
      },
      {
        scene_type: 'cta',
        duration_seconds: 4,
        elements: [{ type: 'CTALock', text: 'Start building today' }],
      },
    ],
    style_mode: 'dark',
    total_duration_seconds: 17,
  },
  screenshotUrls: [
    'https://placehold.co/1920x1080/111111/FFFFFF?text=Screenshot+1',
    'https://placehold.co/1920x1080/111111/FFFFFF?text=Screenshot+2',
  ],
  tier: 'free',
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TempoVideo"
        component={TempoVideo}
        defaultProps={defaultProps}
        calculateMetadata={calculateTempoMetadata}
      />
    </>
  )
}
