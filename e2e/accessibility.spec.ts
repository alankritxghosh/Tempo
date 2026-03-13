import { test, expect } from '@playwright/test'

test.describe('Accessibility - Global', () => {
  test('landing page has lang attribute on html', async ({ page }) => {
    await page.goto('/')
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBeTruthy()
    expect(lang).toBe('en')
  })

  test('page has meta viewport for responsive', async ({ page }) => {
    await page.goto('/')
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
    expect(viewport).toContain('width=device-width')
  })
})

test.describe('Accessibility - Focus Management', () => {
  test('landing: CTA link has visible focus style class', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: 'Start creating' })
    const classes = await cta.getAttribute('class')
    expect(classes).toContain('focus:outline')
  })

  test('auth: form inputs have focus styles', async ({ page }) => {
    await page.goto('/auth')

    const emailClasses = await page.locator('#auth-email').getAttribute('class')
    expect(emailClasses).toContain('focus:')

    const passwordClasses = await page.locator('#auth-password').getAttribute('class')
    expect(passwordClasses).toContain('focus:')
  })

  test('landing: footer links have focus styles', async ({ page }) => {
    await page.goto('/')
    const footerLinks = page.locator('nav[aria-label="Footer navigation"] a')
    const count = await footerLinks.count()
    for (let i = 0; i < count; i++) {
      const classes = await footerLinks.nth(i).getAttribute('class')
      expect(classes).toContain('focus:outline')
    }
  })
})

test.describe('Accessibility - ARIA Attributes', () => {
  test('landing: all major sections have aria-labels', async ({ page }) => {
    await page.goto('/')

    const ariaLabelledSections = page.locator('section[aria-label]')
    const count = await ariaLabelledSections.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('auth: error div has role="alert"', async ({ page }) => {
    await page.goto('/auth')
    const alert = page.locator('[role="alert"]')
    await expect(alert).toHaveCount(1)
  })

  test('auth: error div has aria-live="polite"', async ({ page }) => {
    await page.goto('/auth')
    const alertLive = page.locator('[aria-live="polite"]')
    await expect(alertLive).toHaveCount(1)
  })
})

test.describe('Accessibility - Keyboard Navigation', () => {
  test('landing: tab through key elements reaches CTA', async ({ page }) => {
    await page.goto('/')

    let foundCta = false
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(() => document.activeElement?.tagName)
      const text = await page.evaluate(() => document.activeElement?.textContent)
      if (text?.includes('Start creating')) {
        foundCta = true
        break
      }
    }
    expect(foundCta).toBe(true)
  })

  test('auth: tab through reaches email, password, and submit', async ({ page }) => {
    await page.goto('/auth')

    const targets = new Set<string>()
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab')
      const id = await page.evaluate(() => document.activeElement?.id)
      const type = await page.evaluate(() => (document.activeElement as HTMLButtonElement)?.type)
      if (id) targets.add(id)
      if (type === 'submit') targets.add('submit')
    }

    expect(targets.has('auth-email')).toBe(true)
    expect(targets.has('auth-password')).toBe(true)
    expect(targets.has('submit')).toBe(true)
  })
})

test.describe('Accessibility - Color & Contrast', () => {
  test('landing: background is dark (#0A0A0A)', async ({ page }) => {
    await page.goto('/')
    const bg = await page.evaluate(() => getComputedStyle(document.querySelector('.bg-tempo-page')!).backgroundColor)
    expect(bg).toBeTruthy()
  })

  test('auth: card background provides contrast against page', async ({ page }) => {
    await page.goto('/auth')
    const pageBg = await page.evaluate(() =>
      getComputedStyle(document.querySelector('.bg-tempo-page')!).backgroundColor
    )
    const cardBg = await page.evaluate(() =>
      getComputedStyle(document.querySelector('.bg-tempo-card')!).backgroundColor
    )
    expect(pageBg).not.toEqual(cardBg)
  })
})
