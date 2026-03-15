# Tempo — Technical Documentation

> **Ship at the speed of Tempo.**
> A generative motion design engine that turns product screenshots into Apple-style promo videos in under 3 minutes.

---

## Table of Contents

- [1. Product Overview](#1-product-overview)
- [2. Architecture](#2-architecture)
  - [2.1 System Architecture](#21-system-architecture)
  - [2.2 Repository Structure](#22-repository-structure)
  - [2.3 External Services](#23-external-services)
  - [2.4 Database Schema](#24-database-schema)
  - [2.5 Environment Variables](#25-environment-variables)
- [3. User Flow](#3-user-flow)
  - [3.1 Full Journey](#31-full-journey)
  - [3.2 Session Storage Keys](#32-session-storage-keys)
- [4. Pages (Frontend Routes)](#4-pages-frontend-routes)
- [5. API Reference](#5-api-reference)
  - [5.1 Auth](#51-auth)
  - [5.2 Upload](#52-upload)
  - [5.3 AI Generation](#53-ai-generation)
  - [5.4 Render Pipeline](#54-render-pipeline)
  - [5.5 Video Management](#55-video-management)
  - [5.6 Billing](#56-billing)
  - [5.7 Email & Cron](#57-email--cron)
- [6. Render Server](#6-render-server)
  - [6.1 Architecture](#61-architecture)
  - [6.2 Video Composition](#62-video-composition)
  - [6.3 Animation Primitives](#63-animation-primitives)
- [7. Type System](#7-type-system)
- [8. Component Library](#8-component-library)
- [9. Hooks](#9-hooks)
- [10. Design System](#10-design-system)
- [11. Security](#11-security)
- [12. Code Health Report](#12-code-health-report)
  - [12.1 Dead Code & Orphaned Files](#121-dead-code--orphaned-files)
  - [12.2 Clean Code Violations](#122-clean-code-violations)
  - [12.3 Recommended Refactors](#123-recommended-refactors)

---

## 1. Product Overview

Tempo targets **indie app founders** shipping on Product Hunt and X. It solves a specific problem: creating professional motion-design promo videos without hiring a designer or learning After Effects.

**User input:** 2–4 product screenshots + a short description.
**Output:** A 15–30 second motion-graphics video with hook text, product reveals, and a CTA.

**Tiers:**

| Feature | Free | Pro (₹999/mo) |
|---|---|---|
| Resolution | 480p | 1080p |
| Watermark | "Made with Tempo" | None |
| Download expiry | 72 hours | 30 days |

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                            │
│                                                                     │
│  Landing ─► Auth ─► Upload ─► Hooks ─► Style ─► Render ─► Preview  │
│                                                         │           │
│                                                    Library          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     NEXT.JS APP (Vercel)                             │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ App      │  │ API      │  │ Lib      │  │ Components       │    │
│  │ Router   │  │ Routes   │  │ Clients  │  │ (UI + Feature)   │    │
│  │ (Pages)  │  │ (13)     │  │ (10)     │  │ (24)             │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────────────┘    │
│       │              │             │                                  │
│       │              ├─────────────┤                                  │
│       │              ▼             ▼                                  │
│       │    ┌──────────────────────────────────────────┐              │
│       │    │              Service Layer               │              │
│       │    │                                          │              │
│       │    │  Supabase   Gemini   R2   Razorpay      │              │
│       │    │  (Auth/DB)  (AI)   (CDN)  (Billing)     │              │
│       │    └──────────────────────────────────────────┘              │
└──────────────────────────────┬───────────────────────────────────────┘
                               │ HTTP (x-render-secret)
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   RENDER SERVER (Railway)                             │
│                                                                      │
│  Express ──► Remotion renderMedia() ──► R2 Upload                    │
│  (Queue: max 2 concurrent)                                           │
│                                                                      │
│  ┌──────────────────────────────────────────┐                        │
│  │         TempoVideo Composition           │                        │
│  │  Scene 1 (Hook) ──► Scene 2 (Reveal)     │                        │
│  │  ──► Scene 3 (CTA)                       │                        │
│  │                                          │                        │
│  │  6 Primitives: WordReveal, ScreenPush,   │                        │
│  │  TitleSlam, FeatureCallout, SceneFade,   │                        │
│  │  CTALock                                 │                        │
│  └──────────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Repository Structure

```
Tempo/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Landing page (SSR)
│   │   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   │   ├── globals.css           # CSS variables + Tailwind v4 theme
│   │   ├── auth/                 # Sign-in/sign-up + OAuth callback
│   │   ├── upload/               # Screenshot upload + description input
│   │   ├── hooks/                # AI hook selection
│   │   ├── style/                # Dark/Light mode selection
│   │   ├── render/               # Render trigger + progress polling
│   │   ├── preview/              # Video preview + download
│   │   ├── library/              # Video history (SSR)
│   │   └── api/                  # 13 API routes (see §5)
│   ├── components/               # 24 React components (see §8)
│   │   ├── ui/                   # Design system primitives
│   │   ├── landing/              # Landing page sections
│   │   ├── billing/              # Pricing, upgrade flows
│   │   ├── upload/               # DropZone, ScreenshotGrid
│   │   ├── hooks/                # HookCard
│   │   ├── render/               # DirectorBrief, ProgressBar
│   │   └── library/              # VideoCard, EmptyState
│   ├── hooks/                    # 4 custom hooks (see §9)
│   ├── lib/                      # Service clients (see §2.3)
│   ├── tokens/                   # Design tokens (JS)
│   └── types/                    # Zod schemas + TypeScript types
├── render-server/                # Standalone Remotion render service
│   └── src/
│       ├── server.ts             # Express server with job queue
│       ├── index.ts              # Remotion entry point
│       ├── Root.tsx              # Remotion root component
│       ├── types.ts              # Shared Zod schemas
│       ├── compositions/         # TempoVideo.tsx
│       └── primitives/           # 6 animation components
├── docs/                         # Product docs
│   └── Tempo_PRD_v1.0.md        # Product requirements document
├── DESIGN.md                     # Neo-Brutalist design system spec
├── DOCUMENTATION.md              # This file
├── package.json
└── next.config.ts                # CSP, security headers, React Compiler
```

### 2.3 External Services

| Service | Purpose | Client Module |
|---|---|---|
| **Supabase** | Auth (email + Google OAuth), PostgreSQL DB, screenshot storage | `lib/supabase/{client,server,service}.ts` |
| **Google Gemini 2.5 Flash** | Hook generation (4 hooks), Director's Brief (3-scene JSON) | `lib/gemini/{hooks,brief}.ts` |
| **Cloudflare R2** | Rendered video storage, signed download URLs | `lib/r2/client.ts` |
| **Remotion Render Server** | H264 MP4 video rendering (Express on Railway) | `lib/remotion/client.ts` |
| **Razorpay** | Payment processing (INR), webhook-driven tier management | `lib/razorpay/client.ts` |
| **Resend** | Weekly hook email delivery | `lib/resend/{client,templates}.ts` |
| **PostHog** | Product analytics | `components/PostHogProvider.tsx` |

### 2.4 Database Schema

#### `profiles`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Matches Supabase auth user ID |
| `email` | text | |
| `tier` | text | `'free'` or `'pro'` |
| `videos_generated_this_month` | integer | Incremented via `increment_videos_generated` RPC |
| `subscription_id` | text | Razorpay subscription ID |
| `subscription_status` | text | `'active'`, `'cancelled'`, `'halted'` |
| `hook_email_opted_in` | boolean | Weekly email preference |
| `created_at` | timestamptz | |

#### `videos`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | |
| `user_id` | UUID (FK) | References `profiles.id` |
| `hook_text` | text | Selected hook copy |
| `style_mode` | text | `'dark'` or `'light'` |
| `status` | text | `'pending'` → `'rendering'` → `'complete'` / `'failed'` |
| `video_url` | text | R2 object key (e.g., `videos/{id}.mp4`) |
| `thumbnail_url` | text | |
| `render_time_seconds` | numeric | |
| `created_at` | timestamptz | |

#### `webhook_events`

| Column | Type | Notes |
|---|---|---|
| `id` | auto | |
| `event_id` | text (unique) | Razorpay idempotency key |
| `payload` | jsonb | Full webhook payload |

#### RPC

- `increment_videos_generated(user_uuid UUID)` — atomically increments `videos_generated_this_month` by 1.

### 2.5 Environment Variables

**Next.js app (Vercel):**

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only) |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `R2_ENDPOINT` | Yes | Cloudflare R2 S3-compatible endpoint |
| `R2_ACCESS_KEY_ID` | Yes | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Yes | R2 secret key |
| `R2_BUCKET_NAME` | Yes | R2 bucket name |
| `REMOTION_RENDER_SERVER_URL` | No | Render server base URL (mock mode if unset) |
| `REMOTION_RENDER_SERVER_SECRET` | No | Shared secret for render server auth |
| `RAZORPAY_KEY_ID` | No | Razorpay key (503 if unset) |
| `RAZORPAY_KEY_SECRET` | No | Razorpay secret |
| `RESEND_API_KEY` | No | Resend email API key |
| `RESEND_FROM_EMAIL` | No | Sender email address |
| `CRON_SECRET` | No | Bearer token for cron endpoints |
| `NEXT_PUBLIC_APP_URL` | No | App base URL (for email links) |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog host |

**Render server (Railway):**

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Express port (defaults to 3000) |
| `REMOTION_RENDER_SERVER_SECRET` | Yes | Must match the Next.js app |
| `R2_ACCOUNT_ID` | Yes | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | Yes | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Yes | R2 secret key |
| `R2_BUCKET_NAME` | Yes | R2 bucket name |

---

## 3. User Flow

### 3.1 Full Journey

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Landing  │────►│  Auth    │────►│  Upload  │────►│  Hooks   │
│   /      │     │  /auth   │     │  /upload │     │  /hooks  │
└──────────┘     └──────────┘     └──────────┘     └─────┬────┘
                                                         │
                                                         ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Library  │◄────│ Preview  │◄────│  Render  │◄────│  Style   │
│ /library │     │ /preview │     │  /render │     │  /style  │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

**Step-by-step:**

1. **Landing** (`/`) — Hero, demo video, how-it-works, pricing. CTA → Auth.
2. **Auth** (`/auth`) — Email/password or Google OAuth. On success → Upload.
3. **Upload** (`/upload`) — Clears session. User uploads 2–4 screenshots via `POST /api/upload`. Enters product description (10–300 chars). "Generate hooks" → `POST /api/hooks` → Gemini returns 4 hooks. Stores hooks + screenshots + description in `sessionStorage`.
4. **Hooks** (`/hooks`) — Displays 4 hook cards. User selects one. Stored in `sessionStorage`.
5. **Style** (`/style`) — Dark or Light mode cards with live screenshot preview. On selection → `POST /api/brief` → Gemini generates 3-scene director's brief. Stored in `sessionStorage`.
6. **Render** (`/render`) — Displays director's brief as a human-readable shot list. "Start rendering" → `POST /api/render` → creates DB record, triggers render server. `useRenderStatus` polls every 3 seconds. Progress bar updates. On completion → auto-navigates to Preview.
7. **Preview** (`/preview`) — Fetches signed URL via `GET /api/download`. Video autoplays. Download button. "Create another" link.
8. **Library** (`/library`) — Server-rendered grid of all user's past videos. Delete via `DELETE /api/videos`.

### 3.2 Session Storage Keys

| Key | Set At | Read At | Value |
|---|---|---|---|
| `tempo_hooks` | Upload page | Hooks page | JSON `Hook[]` |
| `tempo_description` | Upload page | Style page, Render page | String |
| `tempo_screenshots` | Upload page | Hooks, Style, Render pages | JSON `string[]` (URLs) |
| `tempo_selected_hook` | Hooks page | Style page | JSON `Hook` |
| `tempo_brief` | Style page | Render page | JSON `DirectorBrief` |
| `tempo_style_mode` | Style page | Render page | `'dark'` or `'light'` |
| `tempo_video_id` | Render page | Preview page | UUID string |
| `tempo_video_url` | Render page | **Unused** (dead key) | R2 key string |

---

## 4. Pages (Frontend Routes)

| Route | Component Type | Auth | Description |
|---|---|---|---|
| `/` | Server Component | No | Landing page — hero, marquee, demo, how-it-works, pricing, footer |
| `/auth` | Client Component | No | Sign-in/sign-up form + Google OAuth |
| `/auth/callback` | Route Handler | No | OAuth code exchange, redirects to `/upload` |
| `/upload` | Client Component | Yes | Screenshot upload + description + hook generation trigger |
| `/hooks` | Client Component | Yes | 4-card hook picker (session-driven) |
| `/style` | Client Component | Yes | Dark/Light mode picker + brief generation trigger |
| `/render` | Client Component | Yes | Director's brief display, render trigger, progress polling |
| `/preview` | Client Component | Yes | Video player + download (signed URL) |
| `/library` | Server Component | Yes | Grid of all user videos (Supabase query) |

---

## 5. API Reference

### 5.1 Auth

#### `POST /api/auth/signup`

Creates a new user with email confirmed.

| Field | Value |
|---|---|
| Auth | None (public) |
| Body | `{ email: string, password: string }` |
| Response | `200 { user: { id, email } }` or `400/500 error` |
| External | Supabase Admin |

#### `GET /api/auth/callback`

OAuth callback. Exchanges authorization code for session cookie, redirects to `/upload`.

### 5.2 Upload

#### `POST /api/upload`

Uploads a screenshot to Supabase Storage.

| Field | Value |
|---|---|
| Auth | Required |
| Body | `FormData { file: File }` (PNG/JPEG, max 10 MB) |
| Response | `200 { url: string }` (public URL) |
| External | Supabase Storage (`screenshots` bucket) |

### 5.3 AI Generation

#### `POST /api/hooks`

Generates 4 AI hooks from product description and screenshots.

| Field | Value |
|---|---|
| Auth | Required |
| Rate limit | 10 per hour per user |
| Body | `{ description: string, screenshot_urls: string[] }` |
| Response | `200 { hooks: Hook[] }` (exactly 4 hooks) |
| External | Google Gemini 2.5 Flash |

#### `POST /api/brief`

Generates a 3-scene director's brief for video composition.

| Field | Value |
|---|---|
| Auth | Required |
| Rate limit | 5 per hour per user |
| Body | `{ hook_text: string, description: string, screenshot_urls: string[], style_mode: 'dark' \| 'light' }` |
| Response | `200 { brief: DirectorBrief }` |
| External | Google Gemini 2.5 Flash |

### 5.4 Render Pipeline

#### `POST /api/render`

Creates a video record and triggers async rendering.

| Field | Value |
|---|---|
| Auth | Required |
| Body | `{ brief: DirectorBrief, screenshot_urls: string[], style_mode: 'dark' \| 'light' }` |
| Response | `200 { job_id: string, video_id: string }` |
| External | Supabase (insert), Remotion Render Server |
| Notes | If `REMOTION_RENDER_SERVER_URL` is unset, enters mock mode (immediately marks video as complete with a placeholder URL) |

#### `GET /api/render-status`

Polls render progress. Updates DB on completion.

| Field | Value |
|---|---|
| Auth | Required |
| Query | `?job_id=string&video_id=string` |
| Response | `200 { status: 'pending' \| 'rendering' \| 'complete' \| 'failed', progress: number, video_url?: string, render_time_seconds?: number }` |
| External | Remotion Render Server, Supabase |
| Notes | On `complete`, updates video record and calls `increment_videos_generated` RPC |

### 5.5 Video Management

#### `GET /api/download`

Generates a time-limited signed URL for a video.

| Field | Value |
|---|---|
| Auth | Required |
| Query | `?video_id=string` |
| Response | `200 { signed_url: string }` |
| Notes | Pro: 30-day expiry. Free: 72-hour expiry. |

#### `DELETE /api/videos`

Deletes a video from R2 and Supabase.

| Field | Value |
|---|---|
| Auth | Required |
| Body | `{ video_id: string }` |
| Response | `200 { status: 'deleted' }` |
| External | Cloudflare R2, Supabase |

### 5.6 Billing

#### `POST /api/checkout`

Creates a Razorpay order for Pro plan.

| Field | Value |
|---|---|
| Auth | Required |
| Response | `200 { order_id, amount: 99900, currency: 'INR', key_id }` |
| External | Razorpay |

#### `POST /api/checkout/verify`

Verifies Razorpay payment signature and upgrades user.

| Field | Value |
|---|---|
| Auth | Required |
| Body | `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` |
| Response | `200 { status: 'verified', tier: 'pro' }` |
| External | Supabase (profile update) |
| Security | HMAC-SHA256 signature verification |

#### `POST /api/webhooks/razorpay`

Async tier management via Razorpay webhooks.

| Field | Value |
|---|---|
| Auth | HMAC signature + 5-min replay window + idempotency |
| Events | `payment.captured`, `subscription.activated`, `subscription.cancelled`, `subscription.halted` |
| External | Supabase |

### 5.7 Email & Cron

#### `GET /api/cron/weekly-hooks`

Generates trending hooks via Gemini, emails opted-in users.

| Field | Value |
|---|---|
| Auth | Bearer token (`CRON_SECRET`) |
| Response | `200 { sent: number, total: number, errors?: string[] }` |
| External | Supabase, Gemini, Resend |

#### `GET /api/email/unsubscribe`

Opts user out of weekly emails.

| Field | Value |
|---|---|
| Auth | Base64url token (userId:email) |
| Query | `?token=string` |
| Response | HTML confirmation page |

---

## 6. Render Server

### 6.1 Architecture

The render server is a standalone **Express + Remotion** process deployed to **Railway** via Docker.

```
POST /render ──► Job Queue ──► renderMedia() ──► R2 Upload ──► Status Update
                  (max 2)
```

**Endpoints:**

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/health` | None | Returns active renders, queue depth |
| `POST` | `/render` | `x-render-secret` | Accept render job, queue or process |
| `GET` | `/status/:jobId` | `x-render-secret` | Return job status + progress |

**Pipeline:**

1. On startup, lazily bundles the Remotion project (cached after first render).
2. `POST /render` validates the `DirectorBriefSchema`, creates a job entry in an in-memory `Map`.
3. Queue processes up to `MAX_CONCURRENT_RENDERS = 2` concurrently.
4. `renderMedia()` produces an H264 MP4 to a temp directory.
5. Result is uploaded to R2 at key `videos/{videoId}.mp4`.
6. Temp files are cleaned up after upload.

### 6.2 Video Composition

`TempoVideo.tsx` defines the Remotion composition:

- Uses `TransitionSeries` with 15-frame fade transitions between scenes.
- Each scene is rendered by `SceneRenderer`, which maps elements to primitives.
- Resolution: **1920×1080** (pro) or **854×480** (free).
- FPS: **30**.
- Free tier gets a semi-transparent "Made with Tempo" watermark (bottom-right, 30% opacity).

### 6.3 Animation Primitives

| Primitive | Effect | Typical Usage |
|---|---|---|
| `WordReveal` | Words spring in one-by-one with opacity + Y translation | Hook text entrance |
| `ScreenPush` | Screenshot slides in from bottom with spring physics | Product screenshots |
| `TitleSlam` | Text slams in with scale overshoot + fade | Scene titles |
| `FeatureCallout` | Text slides in from left with staggered delay | Feature descriptions |
| `SceneFade` | Simple opacity fade in/out | Scene transitions |
| `CTALock` | Text + URL lock into position with spring | Final call-to-action |

---

## 7. Type System

All types are defined via **Zod schemas** with inferred TypeScript types in `src/types/index.ts`.

### Core Schemas

```
HookSchema ──► { text: string (3-7 words), framework: string, trend_confidence: number (0-1) }

DirectorBriefSchema ──► {
  scenes: [3] ──► {
    scene_type: 'hook' | 'product_reveal' | 'cta',
    duration_seconds: number (2-15),
    elements: Element[] ──► {
      type: 'WordReveal' | 'ScreenPush' | 'TitleSlam' | 'FeatureCallout' | 'SceneFade' | 'CTALock',
      text?: string,
      screenshot_index?: number,
      delay_seconds?: number
    },
    narration?: string
  },
  style_mode: 'dark' | 'light',
  total_duration_seconds: number
}
```

### Domain Types

| Type | Definition |
|---|---|
| `Hook` | Inferred from `HookSchema` |
| `DirectorBrief` | Inferred from `DirectorBriefSchema` |
| `Tier` | `'free' \| 'pro'` |
| `VideoStatus` | `'pending' \| 'rendering' \| 'complete' \| 'failed'` |
| `Profile` | `{ id, email, tier, videos_generated_this_month, subscription_id, subscription_status, hook_email_opted_in, created_at }` |
| `Video` | `{ id, user_id, hook_text, style_mode, status, video_url, thumbnail_url, render_time_seconds, created_at }` |

---

## 8. Component Library

### Design System (`components/ui/`)

| Component | Purpose |
|---|---|
| `Button` | Primary/outline/ghost with neo-brutalist lift/press CSS |
| `Card` | White card with 3px black border + offset shadow, selected state (yellow) |
| `Modal` | Overlay dialog with XL shadow |
| `Toast` | Notification with colored left-border accent |
| `TextArea` | Multi-line input with character counter, shadow-on-focus |
| `SectionLabel` | JetBrains Mono uppercase label (11px tracking-widest) |
| `AccentRule` | 4px × 40px black bar divider |
| `Badge` | Yellow badge with 2px border |
| `Skeleton` | Shimmer loading placeholder |

### Feature Components

| Group | Component | Purpose |
|---|---|---|
| `landing/` | `LandingHero` | Hero section with display typography |
| `landing/` | `HowItWorks` | 3-step explanation |
| `billing/` | `PricingSection` | Free vs Pro comparison |
| `billing/` | `PricingCard` | Individual plan card |
| `billing/` | `UpgradeBanner` | Render page upgrade prompt |
| `billing/` | `UpgradeModal` | Payment flow modal |
| `upload/` | `DropZone` | Drag-and-drop file upload area |
| `upload/` | `ScreenshotGrid` | Grid of uploaded screenshots |
| `hooks/` | `HookCard` | Hook display with framework badge + confidence |
| `render/` | `DirectorBrief` | 3-scene brief as a human-readable shot list |
| `render/` | `ProgressBar` | Animated render progress indicator |
| `library/` | `VideoCard` | Video card with download + delete |
| `library/` | `EmptyState` | Empty library CTA |
| root | `PostHogProvider` | PostHog analytics context |
| root | `LandingVideo` | Demo video player on landing |

---

## 9. Hooks

| Hook | Signature | Purpose |
|---|---|---|
| `useSession()` | `() → { user, loading }` | Returns current Supabase auth user, subscribes to auth state changes |
| `useProfile()` | `() → { profile, loading, refresh }` | Fetches user's profile row (tier, subscription status, video count) |
| `useRenderStatus(jobId, videoId)` | `(string?, string?) → { status, progress, current_scene?, video_url? }` | Polls `GET /api/render-status` every 3 seconds, stops on complete/failed |
| `useRazorpayCheckout(callbacks)` | `({ onSuccess, onError }) → { initiateCheckout, loading }` | Creates Razorpay order, loads SDK, opens payment modal, verifies payment |

---

## 10. Design System

Tempo uses a **Neo-Brutalist** design system. Full specification is in `DESIGN.md`.

### Core Principles

| Principle | Implementation |
|---|---|
| Zero border-radius | `border-radius: 0` everywhere |
| Hard black borders | `3px solid #000` on all interactive elements |
| Offset box-shadows | `4px 4px 0px #000` (resting), `6px 6px 0px #000` (hover) |
| Flat, bold colors | Yellow (#FFD700), Pink (#FF6B9D), Blue (#4ECDC4), Coral (#FF6B35) |
| CSS-based interactions | Hover → translate(-2px, -2px) + larger shadow. Press → translate(2px, 2px) + no shadow. |

### Typography

| Role | Font | Weights |
|---|---|---|
| Display | Syne | 700, 800 |
| Heading | Space Grotesk | 500, 700 |
| Body | Inter | 400, 600 |
| Mono | JetBrains Mono | 400 |

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--tempo-page` | `#FFFDF7` | Page background |
| `--tempo-yellow` | `#FFD700` | Primary accent, selected states |
| `--tempo-pink` | `#FF6B9D` | Secondary accent, CTAs |
| `--tempo-blue` | `#4ECDC4` | Tertiary accent, info states |
| `--tempo-coral` | `#FF6B35` | Quaternary accent, alerts |
| `--tempo-card` | `#FFFFFF` | Card backgrounds |
| `--tempo-primary` | `#1A1A1A` | Primary text |
| `--tempo-secondary` | `#4A4A4A` | Secondary text |

---

## 11. Security

### HTTP Headers (via `next.config.ts`)

| Header | Value |
|---|---|
| Content-Security-Policy | Strict CSP allowing self, Razorpay, PostHog, Supabase, R2 |
| X-Frame-Options | `DENY` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Camera, mic, geolocation disabled |

### API Security

| Mechanism | Scope | Implementation |
|---|---|---|
| Supabase session auth | All authenticated routes | `supabase.auth.getUser()` check |
| HMAC-SHA256 | Razorpay webhooks | Signature verification against `RAZORPAY_KEY_SECRET` |
| Replay protection | Razorpay webhooks | 5-minute timestamp window |
| Idempotency | Razorpay webhooks | `webhook_events` table unique constraint on `event_id` |
| Bearer token | Cron endpoint | `CRON_SECRET` comparison |
| In-memory rate limiting | Hooks (10/hr), Briefs (5/hr) | Per-user `Map`-based counter with time window |
| Ownership checks | Download, delete | Verify `video.user_id === user.id` before action |
| React Compiler | Frontend | Enabled via `reactCompiler: true` |

---

## 12. Code Health Report

### 12.1 Dead Code & Orphaned Files

| Category | Count | Details |
|---|---|---|
| **Dead exports** | 17 | Unused functions, types, and constants across `src/types/`, `src/tokens/`, `src/lib/remotion/`, `render-server/src/types.ts` |
| **Orphaned files** | 1 | `src/hooks/useProfile.ts` — exported hook never imported by any component or page |
| **Unused sessionStorage keys** | 1 | `tempo_video_url` — written in render page but never read (preview page uses `tempo_video_id` + signed URL) |
| **Duplicated logic** | 3 patterns | Rate limiter (2 files), Gemini retry loop (3 files), Zod schemas (2 packages) |

**Key dead exports to remove:**

| File | Dead Export |
|---|---|
| `src/hooks/useProfile.ts` | Entire file (orphaned) |
| `src/lib/remotion/client.ts` | `getRenderStatus()` — unused, render-status API fetches directly |
| `src/tokens/index.ts` | `colors`, `typography`, `spacing`, `radius`, `shadows` — only `motion` is imported |
| `src/types/index.ts` | `Element`, `Scene`, `VideoStatus`, `HooksResponse` — never imported by consumers |
| `render-server/src/types.ts` | `springConfigs`, `callback_url` field — never referenced |

### 12.2 Clean Code Violations

#### High Severity (19 findings)

| Issue | Count | Root Cause |
|---|---|---|
| `as never` type casts on Supabase updates | 11 | No generated Supabase types — all `.update()` calls bypass type checking |
| Functions >100 lines with 5+ responsibilities | 3 | `render-status/route.ts` (114 lines), `webhooks/razorpay/route.ts` (108 lines), `render-server/server.ts` (90 lines) |
| Duplicated rate limiter | 2 files | Copy-pasted between `brief/route.ts` and `hooks/route.ts` |
| Duplicated Gemini retry logic | 3 files | Identical 3-attempt loop in `brief.ts`, `hooks.ts`, `cron/weekly-hooks/route.ts` |
| Unsafe nested type casts in webhook | 1 | `(payload?.subscription as Record<string, unknown>)?.entity as Record<string, unknown>` — 3 levels deep |

#### Medium Severity (17 findings)

| Issue | Count | Examples |
|---|---|---|
| `as any` type casts | 2 | `src/lib/r2/client.ts` — S3 presigner compatibility |
| Silent error swallowing | 3 | `VideoCard` download catch, `useRenderStatus` catch, `render-status` catch-all |
| Magic numbers | 5 | Download expiry seconds, webhook replay window, polling interval, upload size limit |
| Memory leak risks | 3 | Unbounded rate limit `Map`, unbounded jobs `Map`, un-revoked blob URLs |
| Repeated auth guard boilerplate | 9 routes | Same `getUser() → if !user → 401` pattern |
| Repeated session read/parse | 4 pages | Same `getItem → JSON.parse → catch → redirect` |

### 12.3 Recommended Refactors

Listed in priority order (highest impact first):

1. **Generate typed Supabase client** — Run `supabase gen types typescript` and use `Database` generic. This single action eliminates all 11 `as never` casts.

2. **Extract shared rate limiter** — Create `src/lib/rate-limit.ts` with a factory function `createRateLimit(maxRequests, windowMs)`. Replace the two copy-pasted implementations.

3. **Extract Gemini retry helper** — Create `src/lib/gemini/retry.ts` with `retryGeminiGeneration<T>(model, prompt, schema, maxAttempts)`. Replace three identical retry loops.

4. **Decompose large API routes** — Break `render-status/route.ts` and `webhooks/razorpay/route.ts` into focused helper functions per responsibility.

5. **Extract auth middleware** — Create `requireAuth(request)` helper that returns `{ user, supabase }` or a `401 NextResponse`. Eliminates 9 instances of identical boilerplate.

6. **Delete orphaned code** — Remove `useProfile.ts`, `getRenderStatus()`, dead token exports, dead type exports, unused `tempo_video_url` sessionStorage writes.

7. **Extract magic numbers** — Create named constants for download expiry durations, webhook replay window, polling interval, upload size limit.

8. **Unify shared schemas** — The Zod schemas in `src/types/index.ts` and `render-server/src/types.ts` are identical but maintained separately. Extract to a shared location to prevent drift.

9. **Add blob URL cleanup** — `ScreenshotGrid` calls `URL.createObjectURL()` without `URL.revokeObjectURL()`. Add a cleanup effect.

10. **Add rate limit map eviction** — The in-memory rate limit `Map` grows without bound. Add periodic cleanup or use an LRU cache.

---

*Generated: March 14, 2026*
*Based on codebase audit of `/Users/alankritghosh/Tempo`*
