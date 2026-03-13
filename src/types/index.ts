import { z } from 'zod'

export const PRIMITIVE_TYPES = [
  'WordReveal',
  'ScreenPush',
  'TitleSlam',
  'FeatureCallout',
  'SceneFade',
  'CTALock',
] as const

export const HookSchema = z.object({
  text: z.string().min(1).refine(
    (text) => {
      const wordCount = text.trim().split(/\s+/).length
      return wordCount >= 3 && wordCount <= 7
    },
    { message: 'Hook must be 3-7 words' }
  ),
  framework: z.string().min(1),
  trend_confidence: z.number().min(0).max(1),
})

export const HooksResponseSchema = z.object({
  hooks: z.array(HookSchema).length(4),
})

export type Hook = z.infer<typeof HookSchema>
export type HooksResponse = z.infer<typeof HooksResponseSchema>

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

export type VideoStatus = 'pending' | 'rendering' | 'complete' | 'failed'
export type Tier = 'free' | 'pro'

export type Profile = {
  id: string
  email: string
  tier: Tier
  videos_generated_this_month: number
  subscription_id: string | null
  subscription_status: string | null
  hook_email_opted_in: boolean
  created_at: string
}

export type Video = {
  id: string
  user_id: string
  hook_text: string
  style_mode: 'dark' | 'light'
  status: VideoStatus
  video_url: string | null
  thumbnail_url: string | null
  render_time_seconds: number | null
  created_at: string
}
