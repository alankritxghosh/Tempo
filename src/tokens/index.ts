export const colors = {
  bg: {
    page: '#FFFDF5',
    card: '#FFFFFF',
    panel: '#F5F3EE',
  },
  pink: '#FF6B6B',
  yellow: '#FFD23F',
  blue: '#74B9FF',
  green: '#88D498',
  lavender: '#B8A9FA',
  black: '#000000',
  text: {
    primary: '#000000',
    secondary: '#333333',
    tertiary: '#666666',
    disabled: '#999999',
  },
  border: {
    default: '#000000',
  },
  success: '#88D498',
  error: '#FF6B6B',
} as const

export const typography = {
  display: {
    fontFamily: 'var(--font-display)',
    hero: { size: '96px', mobileSize: '56px', weight: 800, letterSpacing: '-0.03em', lineHeight: '1.0' },
    h1: { size: '72px', weight: 800, letterSpacing: '-0.02em', lineHeight: '1.05' },
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    h2: { size: '56px', weight: 700, letterSpacing: '-0.02em', lineHeight: '1.05' },
    h3: { size: '32px', weight: 700, letterSpacing: '-0.01em', lineHeight: '1.1' },
    card: { size: '24px', weight: 700, letterSpacing: '-0.01em', lineHeight: '1.2' },
  },
  body: {
    fontFamily: 'var(--font-body)',
    regular: { size: '16px', weight: 400, lineHeight: '1.5' },
    small: { size: '15px', weight: 400, lineHeight: '1.5' },
  },
  label: {
    fontFamily: 'var(--font-mono)',
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
  hover: { x: -2, y: -2 },
  active: { x: 3, y: 3 },
} as const

export const radius = 0 as const

export const shadows = {
  sm: '3px 3px 0 0 #000',
  md: '5px 5px 0 0 #000',
  lg: '8px 8px 0 0 #000',
  xl: '12px 12px 0 0 #000',
} as const
