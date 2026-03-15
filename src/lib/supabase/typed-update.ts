import type { SupabaseClient } from '@supabase/supabase-js'

export function updateProfile(
  supabase: SupabaseClient,
  userId: string,
  data: Partial<{
    tier: 'free' | 'pro'
    subscription_id: string | null
    subscription_status: string | null
    hook_email_opted_in: boolean
  }>
) {
  return supabase.from('profiles').update(data as never).eq('id', userId)
}

export function updateProfileBySubscription(
  supabase: SupabaseClient,
  subscriptionId: string,
  data: Partial<{
    tier: 'free' | 'pro'
    subscription_status: string | null
  }>
) {
  return supabase.from('profiles').update(data as never).eq('subscription_id', subscriptionId)
}

export function updateVideo(
  supabase: SupabaseClient,
  videoId: string,
  data: Partial<{
    status: string
    video_url: string
    thumbnail_url: string
    render_time_seconds: number
  }>
) {
  return supabase.from('videos').update(data as never).eq('id', videoId)
}
