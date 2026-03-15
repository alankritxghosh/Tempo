import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero heading and CTA', async ({ page }) => {
    const heading = page.locator('h1')
    await expect(heading).toContainText('Ship at the speed')
    await expect(heading).toContainText('of Tempo.')

    const cta = page.getByRole('link', { name: 'Get Tempo' }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/auth')
  })

  test('renders hero subtitle', async ({ page }) => {
    await expect(page.getByText('Drop your product screenshots, pick a hook')).toBeVisible()
  })

  test('renders How it Works section with 3 steps', async ({ page }) => {
    const section = page.locator('section[aria-label="How it works"]')
    await expect(section).toBeVisible()

    await expect(page.getByText('Three steps to launch')).toBeVisible()

    await expect(section.getByRole('heading', { name: 'Upload screenshots' })).toBeVisible()
    await expect(section.getByRole('heading', { name: 'Pick a hook' })).toBeVisible()
    await expect(section.getByRole('heading', { name: 'Render & download' })).toBeVisible()

    const stepNumbers = section.locator('span:has-text("01"), span:has-text("02"), span:has-text("03")')
    await expect(stepNumbers).toHaveCount(3)
  })

  test('renders Pricing section with three plans', async ({ page }) => {
    const pricing = page.locator('#pricing')
    await expect(pricing).toBeVisible()
    await expect(page.getByText('Simple pricing')).toBeVisible()

    await expect(page.getByText('₹0')).toBeVisible()
    await expect(page.getByText('Custom', { exact: true })).toBeVisible()
  })

  test('renders footer with navigation', async ({ page }) => {
    const footer = page.locator('footer[role="contentinfo"]')
    await expect(footer).toBeVisible()

    await expect(footer.getByText('Tempo', { exact: true }).first()).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Sign in' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Pricing' })).toBeVisible()
    await expect(footer.getByText(/© 2026 Tempo/)).toBeVisible()
  })

  test('footer Sign in link navigates to auth', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/auth/)
  })

  test('CTA Get Tempo navigates to auth', async ({ page }) => {
    await page.getByRole('link', { name: 'Get Tempo' }).first().click()
    await expect(page).toHaveURL(/\/auth/)
  })
})

test.describe('Landing Page WCAG', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('skip-to-content link is present and works', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toHaveCount(1)
    await expect(skipLink).toHaveText('Skip to main content')

    const main = page.locator('#main-content')
    await expect(main).toHaveCount(1)
  })

  test('hero section has aria-label', async ({ page }) => {
    await expect(page.locator('section[aria-label="Hero"]')).toHaveCount(1)
  })

  test('how it works section has aria-label', async ({ page }) => {
    await expect(page.locator('section[aria-label="How it works"]')).toHaveCount(1)
  })

  test('pricing section has aria-label', async ({ page }) => {
    await expect(page.locator('section[aria-label="Pricing"]')).toHaveCount(1)
  })

  test('footer has contentinfo role', async ({ page }) => {
    await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1)
  })

  test('footer has nav with aria-label', async ({ page }) => {
    const footerNavs = page.locator('footer nav[aria-label]')
    const count = await footerNavs.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('page has proper heading hierarchy (h1 then h2s)', async ({ page }) => {
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)

    const h2s = page.locator('h2')
    const h2Count = await h2s.count()
    expect(h2Count).toBeGreaterThanOrEqual(2)
  })
})
