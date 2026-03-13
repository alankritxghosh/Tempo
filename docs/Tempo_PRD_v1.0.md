**PRODUCT REQUIREMENTS DOCUMENT**

**Tempo**

*Apple-Style Motion Design Videos for Indie App Founders*

  ---------------- ------------------------------------------------------
  **Product**      Tempo --- Generative Motion Design Engine

  **Version**      v1.0 --- MVP

  **Status**       DRAFT --- In Review

  **Author**       Alankrit Ghosh, Founding PM / Engineer

  **Date**         March 2026

  **Revision**     v0.1 Initial Draft
  ---------------- ------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ONE-LINE POSITIONING**

  Tempo turns 4 screenshots and one sentence into a cinematic, Apple-style promo video in under 3 minutes --- built exclusively for indie app founders who ship on Product Hunt and X.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**01**

**Strategy Brief**

**1.1 Product Name**

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **WHY TEMPO**                                                                                                                                                                                                                                                                                                                            |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Tempo** (noun): the rate or speed of motion or activity. The pace at which something happens.                                                                                                                                                                                                                                          |
|                                                                                                                                                                                                                                                                                                                                          |
| Indie founders move fast. They ship weekly, post daily, launch monthly. Tempo matches their cadence. One 15-second video per ship. Every time. Under 3 minutes. The name is one word, easy to say, impossible to misspell, and carries a creative-professional weight without being pretentious. It also has a natural tagline built in: |
|                                                                                                                                                                                                                                                                                                                                          |
| ***\"Ship at the speed of Tempo.\"***                                                                                                                                                                                                                                                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**1.2 Problem Statement**

Indie app founders have a repeatable, urgent creative problem: every time they ship something --- a new feature, a Product Hunt launch, an investor update, an App Store update --- they need a short video that makes their product look premium and credibly designed.

Today their options are:

- **Hire a motion designer:** Rs. 1-2 lakh per video, 5-7 day turnaround. Impractical for a weekly ship cadence.

- **Generic template tool (Canva, CapCut):** Fast but aesthetically generic. The output looks like a template. Founders know it. Viewers know it.

- **Post a screen recording:** Zero production value. No motion. No hook. Scroll-stops nobody.

- **Do nothing:** The default. Most founders simply do not post video because the cost of production is too high relative to the perceived return.

The result: the product the founder spent weeks building gets represented by a screen recording or a static screenshot. The Apple motion design aesthetic --- kinetic text, spring physics, camera push on UI, dark or white precision backgrounds --- is completely inaccessible to a solo builder.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **THE CORE INSIGHT**

  The motion design aesthetic is not hard to produce. It is hard to produce consistently, at speed, without a designer. Tempo systematizes it into a locked, repeatable pipeline so output is always premium and production time is always under 3 minutes.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**1.3 Why Now**

- Danny Nguyen (dnyxstudios) grew from 150 to 10,000+ followers in under 2 months posting Apple-style motion design. The aesthetic demand is proven and documented.

- The indie app builder community on X / Product Hunt is the fastest-growing segment of technical bootstrappers. The number of solo founders shipping AI-native apps has surged through 2025-2026.

- Remotion (React-based video rendering) matured in 2024-2025 making programmatic video generation viable for a solo engineer with zero budget.

- Gemini 1.5 Flash free tier makes the AI copy layer zero-cost at MVP stage.

- No funded competitor targets this specific niche, aesthetic, and buyer. The UGC ad space is saturated (10+ funded players). Apple-style motion design for indie founders is completely untouched.

**1.4 Competitive Landscape**

  ----------------------------- ------------------------------------------------------------------------------------
  **Competitor**                **Why Tempo Wins**

  Creatify / Arcads / MakeUGC   UGC avatar-based ads. Generic aesthetic. Not for app founders. AI actors look off.

  Canva Video / CapCut          Template-based. Zero aesthetic opinion. Output looks like everyone else\'s.

  Hera.Video / Animoto          Stock footage / template. Not motion design. No Apple aesthetic.

  Agent Opus                    Ad creative focused, not Apple motion design, no indie founder positioning.

  Hire a motion designer        Tempo is 100x faster and a fraction of the cost with equivalent aesthetic quality.
  ----------------------------- ------------------------------------------------------------------------------------

**1.5 Business Model**

  ------------------- ----------------------------- -------------------------------------------------------------------------
  **Tier**            **Price**                     **Limits**

  Free                Rs. 0 / month                 1 video/month. Hard watermark. 480p output. No library.

  Pro                 Rs. 1,499 / month (\~\$18)    15 videos/month. No watermark. 1080p. Full library. Hook refresh email.

  Pro Annual          Rs. 12,999 / year (\~\$156)   Same as Pro. 28% savings. Priority render queue.
  ------------------- ----------------------------- -------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **GROWTH LOOP**

  Founders post Tempo-generated videos on X and Product Hunt. Viewers ask what tool they used. Founders tag Tempo. New founders sign up. The watermark on free-tier videos is not punitive --- it is the distribution engine.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**02**

**User Personas & JTBD**

**2.1 Primary Persona --- The Shipping Founder**

  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Name**         The Shipping Founder

  **Profile**      Solo founder or 2-person team. Technical. Vibe coding or traditional engineering background. Ships to Product Hunt, X, or App Store regularly (weekly to monthly).

  **Tools**        Cursor, Lovable, Supabase, Vercel, Linear. Not Adobe. Not After Effects.

  **Budget**       Zero budget for marketing. Will pay for tools that directly produce output they can ship.

  **Trigger**      They just shipped something. They need to post about it in the next 2 hours. They want the post to stop someone scrolling.

  **Success**      Their video gets 10+ replies, someone asks \'what tool did you use\', they DM them Tempo.

  **Failure**      They spend 45 minutes on Canva, hate the result, post a screen recording, get 3 likes.
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2.2 Secondary Persona --- The No-Code Builder**

  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Name**         The No-Code Builder

  **Profile**      Non-technical founder using Bubble, Webflow, or Glide to build apps. Ships regularly but has no design background. Feels acutely that their marketing assets look worse than their product.

  **Trigger**      Seeing a competitor\'s slick Product Hunt video and feeling outclassed by the production quality.

  **Success**      Posting a video that gets comments about the quality of the product design --- not just the idea.
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2.3 Jobs To Be Done**

  ------------------------------------------- -----------------------------------------------------------------------------------------------
  **When I\...**                              **I want to\...**

  ship a new feature to production            post a 15-second video on X within 2 hours that makes it look premium

  launch on Product Hunt                      have a hero video that communicates the product\'s core value prop in 15 seconds

  pitch investors informally on X/LinkedIn    show a polished, credible product demo without a design team

  update my App Store listing                 generate a new preview video that meets Apple\'s aesthetic standards without hiring anyone

  want to go viral on X with a product post   have a scroll-stopping hook with kinetic typography that pulls people into the product reveal
  ------------------------------------------- -----------------------------------------------------------------------------------------------

**03**

**Success Metrics**

**3.1 North Star Metric**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **NORTH STAR**

  Videos generated per week. This single number captures product usage, content distribution (each video is a marketing asset), and platform health simultaneously.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

**3.2 Metric Table**

  --------------------------------- -------------- --------------------- ------------------------------------------------- ------------
  **Metric**                        **Baseline**   **Target @ 90d**      **Measurement**                                   **Owner**

  Videos generated / week           0              200+                  PostHog: video_render_complete                    Founder

  Free-to-Pro conversion rate       ---            \>= 8%                Supabase: tier change events                      Founder

  Week-1 retention                  ---            \>= 55%               PostHog: sessions by user, day 1-7                Founder

  Month-1 Pro churn                 ---            \<= 10%               Supabase: subscription cancellations              Founder

  Video completion rate (preview)   ---            \>= 75%               PostHog: video_preview_complete                   Founder

  Hook-to-render conversion         ---            \>= 85%               PostHog funnel: hook_selected \> render_started   Founder

  Organic mention rate              ---            \>= 1 per 10 videos   Manual X search: \'made with Tempo\'              Founder
  --------------------------------- -------------- --------------------- ------------------------------------------------- ------------

**04**

**Scope --- V1 MVP**

**4.1 In Scope --- V1**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **SCOPE PRINCIPLE**

  V1 is the minimal surface that can produce a premium output, create a viral distribution loop, and validate willingness to pay. Every feature below must directly serve one of those three outcomes.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- **Screenshot upload:** Drag-and-drop or click-to-upload. Accepts PNG/JPEG. 2-4 screenshots. Client-side validation.

- **App description input:** Single text field. 1-3 sentences. Plain text area. No form structure.

- **Hook generation:** Gemini 1.5 Flash generates 4 hooks across 7 frameworks. JSON output. Validated before display. Up to 3 auto-retries on schema failure.

- **Hook selection UI:** 4 large card-format options with trend confidence badge. Single tap selection.

- **Style selection:** Two options only --- Dark Mode (black bg) and Light Mode (off-white bg). Full-bleed preview thumbnails.

- **Director\'s brief generation:** Gemini generates a 3-scene JSON brief using selected hook and 6 locked animation primitives.

- **Remotion render pipeline:** Takes director\'s brief JSON. Renders 15-22 second video at 1080p (Pro) or 480p watermarked (Free).

- **In-browser preview:** Autoplay on loop. Black background. Full-width. No UI chrome around player.

- **Download:** MP4 download. Watermarked for Free tier. Clean for Pro.

- **Video library:** All generated videos saved per account. Card grid view. Hover-to-play thumbnails.

- **Auth:** Email + password. Google OAuth. Supabase Auth.

- **Billing:** Razorpay (India-first). Monthly and annual Pro plans.

- **Weekly hook refresh email:** Monday 9am IST. 3 trending hooks for the user\'s app category. Deep-links back into product with context pre-loaded.

**4.2 Explicitly Out of Scope --- V1 (Icebox)**

- Custom animation primitives or motion controls

- Voiceover / audio layer

- Brand kit / custom fonts / custom color override

- Team accounts / multi-user

- Figma plugin or API access

- Direct social posting integration (X, LinkedIn, Instagram)

- Mobile app (web-first only at launch)

- More than 2 visual style modes

- Batch rendering / bulk generation

- Custom aspect ratios (16:9 only at launch)

**05**

**Functional Requirements**

Each requirement is written as a user story with acceptance criteria and priority level.

P0 = must ship for launch. P1 = should ship for launch. P2 = post-launch.

  -------- ------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------
  **ID**   **User Story**                                                                                                                              **Acceptance Criteria**                                                                                                                                                                                                              **Priority**

  FR-01    As a founder, I want to upload 2-4 screenshots so that Tempo uses my actual UI as the hero asset.                                           Accepts PNG/JPEG up to 10MB each. Rejects count outside 2-4 with clear error. Displays screenshots in staggered spring-animated card reveal. Upload completes in \< 3s on standard broadband.                                        **P0 MUST**

  FR-02    As a founder, I want to describe my app in one sentence so that Gemini understands the product context.                                     Single text area. 10-char minimum, 300-char maximum. Character count visible. Submit disabled until minimum met. No form structure --- just a text area.                                                                             **P0 MUST**

  FR-03    As a founder, I want to see 4 hook options so that I can choose the angle most on-brand for my launch.                                      Gemini returns valid JSON with exactly 4 hooks, each using a different framework, 3-7 words, with trend_confidence score. Auto-retries up to 3x on schema failure silently. If all retries fail, shows error state with retry CTA.   **P0 MUST**

  FR-04    As a founder, I want to select my hook with one tap so that I feel like a creative director, not a form-filler.                             Single selection only. Selected card gets navy border. Unselected cards drop to 40% opacity. Selection persists through style selection. No form submission required.                                                                **P0 MUST**

  FR-05    As a founder, I want to choose Dark or Light Mode so that my video matches my product\'s aesthetic.                                         Two card options with full-bleed preview thumbnails showing the user\'s own screenshots in each mode. Single tap selection. No other style options visible.                                                                          **P0 MUST**

  FR-06    As a founder, I want to see the director\'s brief build in real time during render so that I stay engaged during the wait.                  Director\'s brief displayed as a plain-language shot list: \'Scene 1: \[description\]\', \'Scene 2: \[description\]\', \'Scene 3: \[description\]\'. Displayed line-by-line as each scene brief completes. Never raw JSON.           **P0 MUST**

  FR-07    As a founder, I want my video to autoplay immediately on the preview screen so that I get the payoff without extra clicks.                  Video autoplays on loop. No download prompt on initial render. Black background. No UI chrome around player. Loops indefinitely.                                                                                                     **P0 MUST**

  FR-08    As a free-tier user, I want to download a watermarked version immediately so that I can evaluate quality before paying.                     Free-tier download shows watermark badge inline. Download completes in \< 5s. Watermark: \'Made with Tempo\' bottom-right, 30% opacity. Upgrade prompt appears only after download --- never before.                                 **P0 MUST**

  FR-09    As a Pro user, I want to download a clean 1080p video so that my output is professional-grade and postable.                                 1080p MP4. No watermark. Download starts \< 2s after click. File size \< 15MB for a 20-second render.                                                                                                                                **P0 MUST**

  FR-10    As a returning user, I want to see all my previous videos in a library so that I have a record of everything I\'ve shipped.                 Card grid layout. Dark background. Thumbnail previews on hover (silent autoplay). Newest first. Each card shows app name, date, style mode. Delete option (with confirmation modal).                                                 **P1 SHOULD**

  FR-11    As a Pro user, I want to receive a Monday morning hook email so that I am prompted to create even when not actively thinking about it.      Email every Monday 9am IST. Subject: \'3 hooks for \[app category\] this week\'. 3 Gemini-generated hooks specific to their category. Deep-link back with context pre-loaded. Opt-out in footer.                                     **P1 SHOULD**

  FR-12    As a new user, I want to sign up with Google so that I do not have to create another password.                                              Google OAuth via Supabase Auth. Account created on first sign-in. No additional onboarding form. Takes user directly to upload screen.                                                                                               **P1 SHOULD**

  FR-13    As a Pro user, I want to regenerate just the hook on my preview screen so that I can try a different angle without re-uploading.            Single \'Regenerate hook\' button below preview player. Re-runs hook generation with same screenshots and description. Does not reset style selection. Re-renders after hook selection.                                              **P1 SHOULD**

  FR-14    As a user, I want the product UI to use spring physics on every state transition so that the interface feels like the output it produces.   All panel transitions use spring physics (not CSS ease-in-out). Button press compresses 2% and springs back. Card selection has spring on tap. No linear CSS transitions anywhere in the product.                                    **P0 MUST**
  -------- ------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------

**06**

**Non-Functional Requirements**

**6.1 Performance**

- **Time to first hook display:** \<= 4 seconds from screenshot upload completion

- **Render time:** \<= 90 seconds for a 15-22 second video at 1080p

- **Page load:** \<= 1.5 seconds on 4G mobile connection (LCP target)

- **Download start:** \<= 2 seconds from download button click

**6.2 Availability**

- Uptime SLA: 99.5% monthly (acceptable for MVP stage)

- Render queue: async --- a failing job does not block other renders

- Gemini API fallback: retry 3x with 2s backoff before surfacing user error

**6.3 Security**

- User screenshots stored in Supabase Storage with row-level security. No cross-user access possible.

- Rendered videos stored in Cloudflare R2 with signed URLs. Expiry: 72 hours (Free), 30 days (Pro).

- All API routes authenticated. No unauthenticated routes except landing page and sign-up.

- Billing handled entirely by Razorpay. No card data touches Tempo servers.

- Gemini API key stored in server-side environment variable. Never exposed to client.

**6.4 Accessibility**

- WCAG 2.1 AA compliance target at launch

- All interactive elements keyboard-navigable

- Minimum contrast ratio 4.5:1 for all body text

- Alt text on all uploaded screenshot thumbnails (auto-generated from app description)

**6.5 Browser Support**

- Web-first. Desktop primary (80% of target audience builds and posts from desktop).

- Browsers: Chrome 120+, Safari 17+, Firefox 121+, Edge 120+

- Mobile web: functional but not optimized at V1.

**07**

**Product & Codebase Architecture**

**7.1 Tech Stack**

  ----------------------- -------------------------------------------------------------------------------------------------------------
  **Layer**               **Technology**

  Frontend                Vite + React 18. Tailwind CSS. Framer Motion for spring physics. Deployed on Vercel.

  Video Rendering         Remotion (React-based). Server-side render via Remotion Lambda or self-hosted Node render server on Fly.io.

  AI / Copy Generation    Google Gemini 1.5 Flash (free tier). Structured JSON output. 3-retry validation pipeline.

  Backend / Auth          Supabase (PostgreSQL, Auth, Storage, Edge Functions). Row-level security on all user data.

  Video Storage           Cloudflare R2. Signed URLs with tier-based expiry. Zero egress fees on downloads.

  Billing                 Razorpay (India-first). Monthly and annual Pro plans. Webhooks to Supabase for tier management.

  Email                   Resend.com free tier. Weekly hook refresh email via Supabase Edge Function cron.

  Analytics               PostHog (cloud free tier). All key funnel events instrumented from day 1.
  ----------------------- -------------------------------------------------------------------------------------------------------------

**7.2 Codebase Domain Structure**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ARCHITECTURE PRINCIPLE**

  Each domain owns its own logic, routes, and data contracts. No domain imports directly from another domain\'s internal modules --- only through defined interfaces. The render pipeline is completely independent from the AI layer, which is completely independent from auth. This keeps the system debuggable and shippable fast.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Domain**              **Responsibility**

  /src/ai                 All Gemini API calls. Hook generation prompt. Director\'s brief prompt. JSON schema validation. Retry logic. Never renders video --- only returns validated JSON.

  /src/render             Remotion composition definitions. Takes director\'s brief JSON as input, returns video URL. No knowledge of how the JSON was generated.

  /src/storage            Supabase Storage uploads (screenshots). Cloudflare R2 writes (rendered videos). Watermark injection. Signed URL generation.

  /src/auth               Supabase Auth integration. Session management. Tier checks (Free vs Pro). Route guards.

  /src/billing            Razorpay checkout flow. Webhook handlers. Tier upgrade/downgrade logic. Writes to Supabase users table.

  /src/email              Resend integration. Weekly hook email template. Cron trigger via Supabase Edge Function.

  /src/api                Routes. Orchestrates domains. No business logic lives here --- only routing and response formatting.

  /src/ui                 React components. All consume design tokens from /src/tokens. Zero hardcoded color or spacing values.

  /src/tokens             Single source of truth for all design variables. Colors, spacing, typography, animation timing, shadows. One file. Everything imports from here.
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------

**7.3 Design Token Architecture**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **TOKEN DISCIPLINE**

  Every visual decision is a named token, not a hardcoded value. When the accent color changes, one line in tokens.ts changes and every component updates. This is the discipline Adobe uses across 130 products. Tempo uses it across one, but the habit compounds.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Minimum token set for V1:

- **Color:** \--color-bg-dark, \--color-bg-light, \--color-surface-dark, \--color-surface-light, \--color-accent, \--color-text-primary, \--color-text-muted, \--color-border

- **Typography:** \--font-family, \--font-size-body, \--font-size-label, \--font-size-heading, \--font-weight-regular, \--font-weight-semibold

- **Spacing:** \--spacing-xs (4px), \--spacing-sm (8px), \--spacing-md (16px), \--spacing-lg (24px), \--spacing-xl (40px), \--spacing-2xl (64px)

- **Motion:** \--spring-stiffness, \--spring-damping, \--spring-mass --- all Framer Motion spring values. No CSS ease-in-out anywhere.

- **Radius:** \--radius-sm (4px), \--radius-md (8px), \--radius-lg (12px)

**7.4 Animation Primitive Registry**

These 6 primitives are the only motion behaviors the render engine uses. They are locked. No user-facing customization. The consistency of these primitives across every Tempo video is the quality moat.

  ------------------- ------------------------------------------------------------------------ ----------------------------------------------------------------------
  **Primitive**       **Behavior**                                                             **Remotion Implementation**

  WordReveal          Words enter left-to-right, spring physics, 200ms stagger between words   interpolateSpring per word, offset by word index \* 6 frames

  ScreenPush          Screenshot enters from bottom, camera pushes in 20% over 30 frames       translateY spring from +200 to 0, scale spring from 1.0 to 1.2

  TitleSlam           Single word/phrase, overshoot bounce, settles in 12 frames               spring with high stiffness (200), low damping (10)

  FeatureCallout      Thin line draws under UI element, label fades in over 20 frames          scaleX from 0 to 1 for line, opacity 0 to 1 for label

  SceneFade           White or black flash between scenes, 8 frames total                      opacity 0 \> 1 \> 0 over 8 frames, color matches selected style mode

  CTALock             CTA text centered, holds for 90 frames (3 seconds), no movement          static Paragraph, interpolate opacity in for first 6 frames only
  ------------------- ------------------------------------------------------------------------ ----------------------------------------------------------------------

**08**

**AI Pipeline Specification**

**8.1 Pipeline Flow**

  --------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Step**                    **Detail**

  Step 1: Hook Generation     User submits screenshots + description. System calls Gemini with Hook Generation prompt. Validates JSON (4 hooks, each 3-7 words, different frameworks, trend_confidence 1-10). Auto-retries up to 3x on schema failure silently. Displays 4 hook cards.

  Step 2: Hook Selection      User selects 1 of 4 hooks. Selected hook text is locked and never modified by any downstream process.

  Step 3: Director\'s Brief   System calls Gemini with Director\'s Brief prompt, passing: selected hook (locked), app description, style mode. Validates JSON: word count \<= 40 across all scenes, CTA format (verb + specific outcome), all primitives from valid registry. Auto-retries up to 3x. Displays plain-language shot list during render.

  Step 4: Render              Director\'s brief JSON passed to Remotion render server. Render server maps each element to its primitive. Outputs MP4. Stored in Cloudflare R2. Signed URL returned to client.

  Step 5: Post-Render         Video stored in user library (Supabase). Watermark injected if Free tier. Download URL presented to user.
  --------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**8.2 JSON Schema Contracts**

**Hook Generation Output**

  ---------------------------- --------------- -------------------------------------------------------------------------------
  **Field**                    **Type**        **Constraint**

  hooks                        Array\[4\]      Exactly 4 items. Never more, never fewer.

  hooks\[\].text               String          3-7 words. No punctuation. No question marks.

  hooks\[\].framework          String (enum)   One of: PAIN, CURIOSITY, CONTRAST, CALLOUT, COUNTER_INTUITIVE, NUMBER, STAKES

  hooks\[\].trend_confidence   Integer         1-10. Higher = more current. Affects badge display.

  hooks\[\].rationale          String          1 sentence. Why this hook works for this product.

  hooks\[\].assumption_made    Boolean         True if product info was insufficient. Logged internally.
  ---------------------------- --------------- -------------------------------------------------------------------------------

**Director\'s Brief Output**

  -------------------------------- --------------- -------------------------------------------------------------------------------
  **Field**                        **Type**        **Constraint**

  scenes                           Array\[3\]      Exactly 3 scenes.

  scenes\[\].scene_role            String (enum)   hook \| product_reveal \| cta

  scenes\[\].duration_seconds      Integer         Scene 1: 4-6s. Scene 2: 8-14s. Scene 3: 3-4s.

  scenes\[\].emotional_intent      String (enum)   curiosity \| recognition \| relief \| excitement \| trust \| urgency

  scenes\[\].scene_director_note   String          1 sentence. Plain English. Only visible UI elements referenced.

  elements\[\].primitive           String (enum)   Must exactly match one of the 6 registered primitives.

  elements\[\].content             String          Text content. No emoji. No special characters.

  elements\[\].entry_frame         Integer         Frame number within the scene when element enters.

  total_word_count                 Integer         Must be \<= 40 across all scene elements combined.

  cta_text                         String          Verb + specific outcome. Forbidden: \'Try now\', \'Learn more\', \'Sign up\'.
  -------------------------------- --------------- -------------------------------------------------------------------------------

**09**

**Dependencies & Risks**

**9.1 External Dependencies**

  ------------------------------------- -------------------------------------------- -------------------------------------------------------------------------------------------------
  **Dependency**                        **Risk Level**                               **Mitigation**

  Google Gemini 1.5 Flash (free tier)   Medium --- rate limits may be hit at scale   Implement request queuing. Upgrade to paid tier at 500+ renders/month. Cache identical prompts.

  Remotion render server                Low --- open source, self-hostable           Run on Fly.io or Railway at V1. Pre-warm instances during peak hours (9am-12pm IST).

  Cloudflare R2                         Low --- extremely reliable                   Signed URL expiry management. Automated cleanup job for expired free-tier videos.

  Razorpay                              Low --- established Indian payment gateway   Webhook idempotency keys. Retry logic on webhook failure. Manual tier update fallback.

  Supabase                              Low                                          Row-level security tested before launch. Backup enabled. Free tier limits monitored.
  ------------------------------------- -------------------------------------------- -------------------------------------------------------------------------------------------------

**9.2 Risk Register**

  ----------------------------------------------------------------- --------------------------- ------------ ------------------------------------------------------------------------------------------------------------------------------------
  **Risk**                                                          **Likelihood**              **Impact**   **Mitigation**

  Output quality is not consistently premium                        Medium                      Critical     Human quality review of first 50 renders. Tune Remotion primitives until quality bar is met before public launch.

  Gemini prompt drift --- outputs become generic as model updates   Medium                      High         Pin to specific model version. Monitor output quality weekly with test suite of 10 fixed inputs.

  Render times exceed 90s regularly                                 Low                         Medium       Pre-render test suite at different load levels before launch. Optimize Remotion composition complexity.

  Founders do not convert Free to Pro                               Medium                      High         A/B test upgrade prompt copy and placement. First conversion target is 60 days post-launch.

  Danny aesthetic becomes saturated on X                            Low (12-18 month horizon)   Medium       Token system allows style refresh. Second mode (glassmorphism, editorial) can be added without re-engineering the render pipeline.

  Competitor launches same product first                            Low                         High         Speed is the only moat. Target 8-week build to launch. Distribution loop via watermark is instant from day 1.
  ----------------------------------------------------------------- --------------------------- ------------ ------------------------------------------------------------------------------------------------------------------------------------

**10**

**Open Questions**

All open questions must have an owner and resolution date before design sign-off.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------ --------------------------------------
  **Question**                                                                                                                                                          **Owner**                **Resolution Date**

  Does Remotion Lambda support the spring animation complexity of the 6 primitives without exceeding Lambda timeout limits? Or do we need a persistent render server?   Alankrit (Engineering)   Week 1 of build

  What is the exact Gemini 1.5 Flash rate limit on the free tier and at what render volume do we need to upgrade?                                                       Alankrit (Engineering)   Week 1 of build

  Should the weekly hook email be a branded newsletter or an in-app notification? Email may go to spam for new users.                                                   Alankrit (Product)       Week 2 of build

  Is 16:9 the right default or should we support 9:16 (vertical) for X/TikTok at V1?                                                                                    Alankrit (Product)       Week 2 of build

  Watermark placement: bottom-right 30% opacity vs center 10% opacity --- which generates more organic curiosity?                                                       Alankrit (Product)       Week 3 --- user test with 5 founders

  Does Razorpay support USD pricing for international users at launch or INR only?                                                                                      Alankrit (Billing)       Week 2 of build

  Should the video library have a hard limit on the Free tier (e.g., last 3 videos only) to create upgrade pressure?                                                    Alankrit (Product)       Week 3 of build
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------ --------------------------------------

**11**

**Revision History**

  ----------------------- ----------------------------------------------------------------------------
  **Version / Date**      **Change Description**

  v0.1 --- March 2026     Initial full draft. All 11 sections complete. Status: DRAFT --- In Review.
  ----------------------- ----------------------------------------------------------------------------

*Tempo PRD v1.0 \| Confidential \| Alankrit Ghosh \| March 2026*
