import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let serviceClient: ReturnType<typeof createSupabaseClient> | null = null

export function createServiceClient() {
  if (serviceClient) return serviceClient

  serviceClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  return serviceClient
}
