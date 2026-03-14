# Tempo Design System — Neo-Brutalist

Canonical Neo-Brutalist design system for Tempo. Every design decision in this file is the implemented source of truth.

Reference: [neubrutalism.com](https://neubrutalism.com/), Gumroad live implementation, NN/Group analysis.

---

## Philosophy

Neo-Brutalism treats the interface as a physical object. Elements have visible weight, clear boundaries, and honest structure. Decoration is expressed through bold color fills — never through gradients, glass effects, or diffused shadows. Every interactive element communicates its function through its shape and its response to interaction (lift on hover, press on click).

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Page Background | `#FFFDF5` | Warm off-white, "printed paper" feel |
| Card Background | `#FFFFFF` | White surface for cards, inputs, modals |
| Panel Background | `#F5F3EE` | Secondary surfaces |
| Black | `#000000` | Borders, text, shadows |
| Bold Yellow | `#FFD23F` | Primary accent, selected states, CTA buttons |
| Coral Pink | `#FF6B6B` | Hero backgrounds, progress fills, error states |
| Sky Blue | `#74B9FF` | Focus rings, info states |
| Soft Green | `#88D498` | Success states |
| Lavender | `#B8A9FA` | Decorative, secondary accents |
| Text Primary | `#000000` | Body text, headings |
| Text Secondary | `#333333` | Supporting text |
| Text Tertiary | `#666666` | Subdued labels |
| Text Disabled | `#999999` | Disabled controls |

---

## Typography

Four-role hierarchy. Each role has a distinct font family and weight, creating clear visual separation.

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | Syne | 800 (ExtraBold) | Hero headlines, page titles, prices |
| Heading | Space Grotesk | 700 (Bold) | Section headings, card titles, button labels |
| Body | Inter | 400 (Regular) | Paragraphs, descriptions, form labels |
| Mono | JetBrains Mono | 400/600 | Section labels, metadata, character counts, step numbers |

### Scale

- Hero: 96px desktop / 56px mobile — Syne 800, tracking -0.03em, line-height 1.0
- H1: 72px — Syne 800, tracking -0.02em, line-height 1.05
- H2: 56px desktop / 32px mobile — Syne 800, tracking -0.02em, line-height 1.05
- H3: 32px — Space Grotesk 700, tracking -0.01em, line-height 1.1
- Card title: 24px — Space Grotesk 700, tracking -0.01em, line-height 1.2
- Body: 16px — Inter 400, line-height 1.5
- Small: 15px — Inter 400, line-height 1.5
- Section label: 11px — JetBrains Mono 600, tracking 0.08em, uppercase
- Metadata: 13px — JetBrains Mono 400

---

## Borders

All borders are solid black. No colored borders except for semantic left-border accents (error/success toasts).

| Token | Value | Usage |
|---|---|---|
| Default | `3px solid #000` | Cards, buttons, inputs, modals |
| Thin | `2px solid #000` | Badges, dividers, skeleton placeholders |
| Thick | `4px solid #000` | Section dividers, hero borders, page separators |

---

## Shadows

Hard offset shadows with zero blur. The shadow is always black and always offset along the positive x and y axes.

| Token | Value | Usage |
|---|---|---|
| Small | `3px 3px 0 0 #000` | Badges, inputs (resting), small controls |
| Medium | `5px 5px 0 0 #000` | Cards, buttons, panels |
| Large | `8px 8px 0 0 #000` | Video containers, hover states |
| XL | `12px 12px 0 0 #000` | Modals, hero elements |

---

## Border Radius

**`0` everywhere.** No rounded corners on any component. Sharp rectangles are the defining geometric rule of Neo-Brutalism.

---

## Interaction Model

Two-step physical metaphor. Elements behave like physical blocks with a shadow cast behind them.

### Hover (lift)
```
transform: translate(-2px, -2px);
box-shadow: 7px 7px 0 0 #000;
transition: all 0.1s ease;
```

### Active / Press (slam down)
```
transform: translate(3px, 3px);
box-shadow: none;
transition: all 0.1s ease;
```

### Focus
```
outline: 3px solid #74B9FF;
outline-offset: 3px;
```

---

## Animation

Framer Motion is used for entrance animations only (`initial` → `animate` with opacity and y-translate). Spring configs:

| Config | Stiffness | Damping | Mass | Usage |
|---|---|---|---|---|
| Primary | 380 | 30 | 1 | Cards, layout transitions |
| Snappy | 500 | 35 | 0.8 | Buttons, toasts, quick transitions |
| Gentle | 200 | 25 | 1.2 | Page entrances, hero elements |

Scale-based `whileHover`/`whileTap` are **not used**. All hover/active interactions use CSS `transition` + `transform` for the canonical lift/press behavior.

---

## Component Inventory

### Button
- Primary: Yellow bg, 3px black border, medium shadow, hover lifts, active presses
- Outline: Page bg, 3px black border, small shadow
- Ghost: Transparent, underline on hover

### Card
- White bg (selected: yellow bg), 3px black border, medium shadow
- Hover lifts, deselected state reduces opacity

### Modal
- White bg, 3px black border, XL shadow
- Flat black/40 overlay (no backdrop blur)

### Toast
- White bg, 3px black border, medium shadow
- 4px colored left border (blue/pink/green by type)

### Badge
- Yellow bg (default), 2px black border, small shadow, sharp corners

### TextArea
- White bg, 3px black border, small shadow (resting), medium shadow (focus)
- Focus lifts element slightly

### AccentRule
- 4px tall × 40px wide black bar

### SectionLabel
- JetBrains Mono 600, 11px, uppercase, 0.08em tracking

### Skeleton
- Shimmer animation between `#F0EEEA` and `#E8E6E2`
- 2px black border

---

## Section Pattern

Landing pages use full-width 4px black border dividers between sections. Hero sections get bold background fills (coral pink). How-it-works cards use alternating bold backgrounds (pink, yellow, blue). Product flow pages use calmer off-white/white backgrounds with the same border and shadow system.

---

## Accessibility

- All text meets WCAG AA 4.5:1 contrast (black text on off-white/white/bold-color backgrounds)
- Focus rings: `outline: 3px solid #74B9FF; outline-offset: 3px` on all interactive elements
- Heavy borders improve control discoverability
- Skip-to-content link on landing page
- `prefers-reduced-motion` disables all animations
