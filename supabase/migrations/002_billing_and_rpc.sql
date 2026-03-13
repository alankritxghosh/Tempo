-- increment_videos_generated RPC (called from render-status when render completes)
create or replace function public.increment_videos_generated(user_uuid uuid)
returns void as $$
begin
  update public.profiles
  set videos_generated_this_month = videos_generated_this_month + 1
  where id = user_uuid;
end;
$$ language plpgsql security definer;

-- Monthly reset function (call via pg_cron or manual trigger on 1st of month)
create or replace function public.reset_monthly_video_counts()
returns void as $$
begin
  update public.profiles set videos_generated_this_month = 0;
end;
$$ language plpgsql security definer;

-- webhook_events should be writable by service role only (no RLS needed since
-- webhooks use service role key), but enable RLS and add policy for safety
alter table public.webhook_events enable row level security;

-- Service role has full access via bypass; no user-level policies needed
-- This prevents anon/authenticated users from reading webhook data
