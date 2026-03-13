import { z } from 'zod'

export const PRIMITIVE_TYPES = [
  'WordReveal',
  'ScreenPush',
  'TitleSlam',
  'FeatureCallout',
  'SceneFade',
  'CTALock',
] as const

export const ElementSchema = z.object({
  type: z.enum(PRIMITIVE_TYPES),
  text: z.string().optional(),
  screenshot_index: z.number().int().min(0).optional(),
  delay_seconds: z.number().min(0).optional(),
})

export const SceneSchema = z.object({
  scene_type: z.enum(['hook', 'product_reveal', 'cta']),
  duration_seconds: z.number().min(2).max(15),
  elements: z.array(ElementSchema).min(1),
  narration: z.string().max(200).optional(),
})

export const DirectorBriefSchema = z.object({
  scenes: z.array(SceneSchema).length(3),
  style_mode: z.enum(['dark', 'light']),
  total_duration_seconds: z.number(),
})

export type Element = z.infer<typeof ElementSchema>
export type Scene = z.infer<typeof SceneSchema>
export type DirectorBrief = z.infer<typeof DirectorBriefSchema>
export type Tier = 'free' | 'pro'

export type RenderJobRequest = {
  brief: DirectorBrief
  screenshot_urls: string[]
  tier: Tier
  video_id: string
  callback_url?: string
}

export type RenderJobStatus = {
  job_id: string
  status: 'queued' | 'rendering' | 'complete' | 'failed'
  progress_percent: number
  current_scene?: number
  video_url?: string
  error?: string
  render_time_seconds?: number
}

export const springConfigs = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 8 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
} as const
