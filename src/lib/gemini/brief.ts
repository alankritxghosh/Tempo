import { GoogleGenerativeAI } from '@google/generative-ai'
import { DirectorBriefSchema, type DirectorBrief } from '@/types'
import { retryGeminiGeneration } from './retry'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const BRIEF_PROMPT = `You are a director creating a 3-scene brief for an Apple-style product video. Your output drives a Remotion video renderer.

SCENE STRUCTURE (exactly 3 scenes, in this order):
1. hook (scene_type: "hook") — Grab attention with the hook text. Use WordReveal or TitleSlam for text. Duration 3-5 seconds.
2. product_reveal (scene_type: "product_reveal") — Showcase the product using screenshots. Use ScreenPush for screenshots, FeatureCallout for labels. Duration 6-12 seconds.
3. cta (scene_type: "cta") — Close with a call to action. Use CTALock for the final text (max 5 words). Duration 3-5 seconds.

AVAILABLE PRIMITIVES (use ONLY these):
- WordReveal: text appears word by word (requires "text" field)
- ScreenPush: screenshot slides in cinematically (requires "screenshot_index" field, 0-based)
- TitleSlam: text slams in with bounce (requires "text" field)
- FeatureCallout: horizontal accent line + label (requires "text" field)
- SceneFade: full scene crossfade (no text needed)
- CTALock: static CTA that holds for 3 seconds (requires "text" field, max 5 words)

ELEMENT RULES:
- text field: max 40 words per element
- screenshot_index: must be 0 to (screenshot_count - 1)
- delay_seconds: stagger within a scene (0 for first element, 0.3-1.0 for subsequent)

Return ONLY valid JSON, no markdown, no backticks:
{
  "scenes": [
    {
      "scene_type": "hook",
      "duration_seconds": 4,
      "elements": [{ "type": "WordReveal", "text": "hook text here", "delay_seconds": 0 }],
      "narration": "Brief camera direction"
    },
    ...
  ],
  "style_mode": "dark",
  "total_duration_seconds": 20
}

Hook: `

export async function generateBrief(
  hookText: string,
  description: string,
  screenshotUrls: string[],
  styleMode: 'dark' | 'light'
): Promise<DirectorBrief> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  })

  const prompt = BRIEF_PROMPT + hookText +
    `\nProduct description: ${description}` +
    `\nStyle mode: ${styleMode}` +
    `\nNumber of screenshots available: ${screenshotUrls.length} (indices 0 to ${screenshotUrls.length - 1})`

  const validated = await retryGeminiGeneration(model, prompt, DirectorBriefSchema)
  const computedTotal = validated.scenes.reduce((sum, s) => sum + s.duration_seconds, 0)
  return { ...validated, total_duration_seconds: computedTotal }
}
