# Tempo

**Turn screenshots into Apple-style product videos in 60 seconds.**

Tempo is a generative motion design engine built for indie app founders who ship on Product Hunt and X. Drop 2–4 screenshots, write one sentence about your app, and get a cinematic promo video — no editing skills required.

## How It Works

1. **Upload** — Drop 2–4 product screenshots and a one-line description
2. **Pick a Hook** — AI generates 4 scroll-stopping hooks; choose the one that hits
3. **Choose Style** — Dark mode or light mode, full-bleed preview
4. **Render & Download** — Video renders in under 90 seconds at 1080p

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Auth & Database | [Supabase](https://supabase.com/) |
| AI | [Google Gemini](https://ai.google.dev/) (hook generation + director's brief) |
| Video Rendering | [Remotion](https://www.remotion.dev/) (separate render server) |
| Storage | [Cloudflare R2](https://www.cloudflare.com/r2/) |
| Payments | [Razorpay](https://razorpay.com/) |
| Email | [Resend](https://resend.com/) |
| Analytics | [PostHog](https://posthog.com/) |
| Deployment | [Vercel](https://vercel.com/) (app) + [Railway](https://railway.app/) (render server) |

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Next.js   │────▸│  Gemini AI   │     │  Remotion Render │
│   (Vercel)  │     │  (Hooks +    │     │  Server          │
│             │────▸│   Brief)     │     │  (Railway)       │
│  App Router │     └──────────────┘     └────────┬────────┘
│  Middleware │                                    │
│  API Routes │◂──────────────────────────────────▸│
└──────┬──────┘                                    │
       │                                           │
       ▼                                           ▼
┌──────────────┐                          ┌─────────────────┐
│   Supabase   │                          │  Cloudflare R2  │
│  Auth + DB   │                          │  Video Storage  │
└──────────────┘                          └─────────────────┘
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router (pages + API routes)
│   ├── components/       # React components (ui, landing, auth, render, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Shared libraries (gemini, supabase, razorpay, r2, remotion, resend)
│   ├── tokens/           # Design tokens
│   ├── types/            # TypeScript type definitions
│   └── middleware.ts     # Auth middleware
├── render-server/        # Separate Remotion render server (Express + Docker)
├── supabase/             # Database migrations
├── e2e/                  # Playwright E2E tests
├── docs/                 # Product documentation
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A Supabase project
- Cloudflare R2 bucket
- Gemini API key

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in all values in .env.local

# Run development server
npm run dev
```

### Render Server

The render server is a separate Express + Remotion service that handles video rendering. It requires Chromium and FFmpeg, so it runs in Docker.

```bash
cd render-server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run locally with Remotion Studio
npm run studio

# Or run the server
npm run dev
```

See `render-server/Dockerfile` for production deployment.

## Environment Variables

Copy `.env.local.example` and fill in the values:

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Supabase service role key |
| `GEMINI_API_KEY` | Server | Google Gemini API key |
| `R2_ENDPOINT` | Server | Cloudflare R2 endpoint |
| `R2_ACCESS_KEY_ID` | Server | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Server | R2 secret key |
| `R2_BUCKET_NAME` | Server | R2 bucket name |
| `REMOTION_RENDER_SERVER_URL` | Server | Render server URL |
| `REMOTION_RENDER_SERVER_SECRET` | Server | Shared secret for render server auth |
| `RAZORPAY_KEY_ID` | Server | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Server | Razorpay key secret |
| `RESEND_API_KEY` | Server | Resend API key |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Client | PostHog ingest host |

## Deployment

### Vercel (Main App)

1. Connect this repository to Vercel
2. Set all environment variables from `.env.local.example`
3. Deploy — Vercel auto-detects Next.js

### Railway (Render Server)

1. Create a new Railway project from `render-server/`
2. Railway auto-detects the Dockerfile
3. Set the render server environment variables from `render-server/.env.example`
4. Copy the deployed URL into `REMOTION_RENDER_SERVER_URL` on Vercel

## License

Private — All rights reserved.
