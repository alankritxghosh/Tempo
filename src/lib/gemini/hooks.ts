import { GoogleGenerativeAI } from '@google/generative-ai'
import { HooksResponseSchema, type Hook } from '@/types'
import { retryGeminiGeneration } from './retry'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const HOOK_PROMPT = `You are a viral video copywriter specializing in Apple-style product launch videos. Given a product description and screenshot context, generate exactly 4 short, punchy video hooks (opening lines).

Rules:
- Each hook MUST be 3-7 words. Count carefully. No exceptions.
- Hooks must stop scrolling in the first 2 seconds of a video.
- Each hook must use a DIFFERENT framework from this list: curiosity gap, bold claim, problem-agitate, future-pacing.
- trend_confidence should reflect realistic engagement potential (0.6-0.95 range).

Return ONLY valid JSON, no markdown, no backticks:
{
  "hooks": [
    { "text": "3-7 word hook", "framework": "curiosity gap", "trend_confidence": 0.85 },
    { "text": "3-7 word hook", "framework": "bold claim", "trend_confidence": 0.75 },
    { "text": "3-7 word hook", "framework": "problem-agitate", "trend_confidence": 0.90 },
    { "text": "3-7 word hook", "framework": "future-pacing", "trend_confidence": 0.70 }
  ]
}

Product description: `

export async function generateHooks(description: string, screenshotUrls: string[]): Promise<Hook[]> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.8,
    },
  })

  const prompt = HOOK_PROMPT + description +
    `\n\nNumber of product screenshots provided: ${screenshotUrls.length}` +
    `\nScreenshot context URLs: ${screenshotUrls.join(', ')}`

  const validated = await retryGeminiGeneration(model, prompt, HooksResponseSchema)
  return validated.hooks
}
