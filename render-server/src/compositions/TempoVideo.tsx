import React from 'react'
import {
  useVideoConfig,
  AbsoluteFill,
} from 'remotion'
import {
  TransitionSeries,
  springTiming,
} from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'

import { WordReveal, ScreenPush, TitleSlam, FeatureCallout, SceneFade, CTALock } from '../primitives'
import type { DirectorBrief, Element, Scene, Tier } from '../types'

loadJakarta('normal', { weights: ['700', '800'], subsets: ['latin'] })
loadInter('normal', { weights: ['400'], subsets: ['latin'] })

export type TempoVideoProps = {
  brief: DirectorBrief
  screenshotUrls: string[]
  tier: Tier
}

const TRANSITION_DURATION_FRAMES = 15

const darkTheme = {
  bg: '#0A0A0A',
  text: '#FFFFFF',
  accent: '#0A84FF',
  secondary: '#8E8E93',
}

const lightTheme = {
  bg: '#F8F8FA',
  text: '#111111',
  accent: '#0A84FF',
  secondary: '#48484A',
}

const RenderElement: React.FC<{
  element: Element
  screenshotUrls: string[]
  theme: typeof darkTheme
  fps: number
}> = ({ element, screenshotUrls, theme, fps }) => {
  const delayFrames = Math.round((element.delay_seconds ?? 0) * fps)

  switch (element.type) {
    case 'WordReveal':
      return (
        <WordReveal
          text={element.text ?? ''}
          color={theme.text}
          fontSize={72}
          fontWeight="800"
          delayFrames={delayFrames}
        />
      )
    case 'ScreenPush':
      return (
        <ScreenPush
          screenshotUrl={screenshotUrls[element.screenshot_index ?? 0] ?? ''}
          delayFrames={delayFrames}
        />
      )
    case 'TitleSlam':
      return (
        <TitleSlam
          text={element.text ?? ''}
          color={theme.text}
          fontSize={96}
          delayFrames={delayFrames}
        />
      )
    case 'FeatureCallout':
      return (
        <FeatureCallout
          text={element.text ?? ''}
          lineColor={theme.accent}
          textColor={theme.text}
          delayFrames={delayFrames}
        />
      )
    case 'CTALock':
      return (
        <CTALock
          text={element.text ?? ''}
          color={theme.text}
          fontSize={56}
          delayFrames={delayFrames}
        />
      )
    case 'SceneFade':
      return null
    default:
      return null
  }
}

const SceneRenderer: React.FC<{
  scene: Scene
  screenshotUrls: string[]
  theme: typeof darkTheme
  fps: number
}> = ({ scene, screenshotUrls, theme, fps }) => {
  const hasFade = scene.elements.some((el) => el.type === 'SceneFade')
  const elements = scene.elements.filter((el) => el.type !== 'SceneFade')

  const content = (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64,
      }}
    >
      {elements.map((element, i) => (
        <div
          key={i}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: element.type === 'ScreenPush' ? 1 : undefined,
          }}
        >
          <RenderElement
            element={element}
            screenshotUrls={screenshotUrls}
            theme={theme}
            fps={fps}
          />
        </div>
      ))}
    </AbsoluteFill>
  )

  if (hasFade) {
    return <SceneFade>{content}</SceneFade>
  }

  return content
}

const Watermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 32,
        right: 40,
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '0.04em',
      }}
    >
      Made with Tempo
    </div>
  )
}

export const TempoVideo: React.FC<TempoVideoProps> = ({
  brief,
  screenshotUrls,
  tier,
}) => {
  const { fps } = useVideoConfig()
  const theme = brief.style_mode === 'dark' ? darkTheme : lightTheme

  const sceneDurations = brief.scenes.map((scene) =>
    Math.round(scene.duration_seconds * fps)
  )

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <TransitionSeries>
        {brief.scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={sceneDurations[i]}>
              <SceneRenderer
                scene={scene}
                screenshotUrls={screenshotUrls}
                theme={theme}
                fps={fps}
              />
            </TransitionSeries.Sequence>
            {i < brief.scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={springTiming({
                  config: { damping: 200 },
                  durationInFrames: TRANSITION_DURATION_FRAMES,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>

      {tier === 'free' && <Watermark />}
    </AbsoluteFill>
  )
}

export const calculateTempoMetadata = ({
  props,
}: {
  props: TempoVideoProps
}) => {
  const fps = 30
  const totalSceneFrames = props.brief.scenes.reduce(
    (sum, scene) => sum + Math.round(scene.duration_seconds * fps),
    0
  )
  const transitionCount = props.brief.scenes.length - 1
  const totalTransitionFrames = transitionCount * TRANSITION_DURATION_FRAMES
  const durationInFrames = totalSceneFrames - totalTransitionFrames

  return {
    durationInFrames: Math.max(durationInFrames, fps),
    fps,
    width: props.tier === 'pro' ? 1920 : 854,
    height: props.tier === 'pro' ? 1080 : 480,
  }
}
