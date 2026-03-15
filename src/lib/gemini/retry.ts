import type { GenerativeModel } from '@google/generative-ai'
import type { z } from 'zod'

const MAX_ATTEMPTS = 3

export async function retryGeminiGeneration<T>(
  model: GenerativeModel,
  prompt: string,
  schema: z.ZodType<T>,
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON in Gemini response')
      return schema.parse(JSON.parse(jsonMatch[0]))
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Unknown error')
      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)))
      }
    }
  }

  throw lastError || new Error('Generation failed after retries')
}
