-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  tier text not null default 'free' check (tier in ('free', 'pro')),
  videos_generated_this_month integer not null default 0,
  subscription_id text,
  subscription_status text,
  hook_email_opted_in boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Videos table
create table if not exists public.videos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  hook_text text not null,
  style_mode text not null check (style_mode in ('dark', 'light')),
  status text not null default 'pending' check (status in ('pending', 'rendering', 'complete', 'failed')),
  video_url text,
  thumbnail_url text,
  render_time_seconds real,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;

create policy "Users can view own videos"
  on public.videos for select
  using (auth.uid() = user_id);

create policy "Users can insert own videos"
  on public.videos for insert
  with check (auth.uid() = user_id);

create policy "Users can update own videos"
  on public.videos for update
  using (auth.uid() = user_id);

create policy "Users can delete own videos"
  on public.videos for delete
  using (auth.uid() = user_id);

-- Webhook events for idempotency
create table if not exists public.webhook_events (
  id uuid default gen_random_uuid() primary key,
  event_id text unique not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Storage bucket for screenshots
insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', true)
on conflict (id) do nothing;

create policy "Users can upload to own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'screenshots'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Anyone can view screenshots"
  on storage.objects for select
  using (bucket_id = 'screenshots');
