export const colors = {
  bg: {
    page: '#0A0A0A',
    card: '#111111',
    panel: '#1A1A1A',
  },
  accent: '#0A84FF',
  accentDark: '#0D1F3C',
  text: {
    primary: '#FFFFFF',
    secondary: '#8E8E93',
    tertiary: '#48484A',
    disabled: '#3A3A3C',
  },
  border: {
    default: '#2A2A2A',
    hover: '#333333',
    accent: '#0A84FF',
  },
  success: '#30D158',
  error: '#FF453A',
  light: {
    bg: '#F8F8FA',
    surface: '#FFFFFF',
    text: '#111111',
    border: '#E0E0E4',
  },
} as const

export const typography = {
  display: {
    fontFamily: 'var(--font-display)',
    hero: { size: '96px', mobilSize: '56px', weight: 800, letterSpacing: '-0.03em', lineHeight: '1.0' },
    h1: { size: '72px', weight: 700, letterSpacing: '-0.02em', lineHeight: '1.05' },
    h2: { size: '56px', weight: 700, letterSpacing: '-0.02em', lineHeight: '1.05' },
    h3: { size: '32px', weight: 700, letterSpacing: '-0.02em', lineHeight: '1.1' },
    hookCard: { size: '24px', weight: 700, letterSpacing: '-0.01em', lineHeight: '1.2' },
  },
  body: {
    fontFamily: 'var(--font-body)',
    regular: { size: '16px', weight: 400, lineHeight: '1.5' },
    small: { size: '15px', weight: 400, lineHeight: '1.5' },
  },
  label: {
    fontFamily: 'var(--font-body)',
    section: { size: '11px', weight: 600, letterSpacing: '0.08em', lineHeight: '1.2' },
  },
  mono: {
    fontFamily: 'var(--font-mono)',
    metadata: { size: '13px', weight: 400, lineHeight: '1.4' },
  },
} as const

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

export const motion = {
  spring: {
    primary: { stiffness: 380, damping: 30, mass: 1 },
    snappy: { stiffness: 500, damping: 35, mass: 0.8 },
    gentle: { stiffness: 200, damping: 25, mass: 1.2 },
  },
  hoverDelay: 60,
  micro: {
    press: 0.98,
    select: 1.02,
    settle: 1.0,
  },
} as const

export const radius = {
  button: '6px',
  badge: '4px',
  card: '8px',
  modal: '12px',
} as const

export const shadows = {
  card: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
  elevated: '0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
  modal: '0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
} as const
