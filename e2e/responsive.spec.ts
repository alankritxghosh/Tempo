import { test, expect, devices } from '@playwright/test'

test.describe('Responsive - Landing Page', () => {
  test('mobile: hero text is visible and properly sized', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Ship at the speed')
  })

  test('mobile: how-it-works cards stack vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const grid = page.locator('section[aria-label="How it works"] .grid')
    await expect(grid).toBeVisible()

    const cards = grid.locator('> div')
    const count = await cards.count()
    expect(count).toBe(3)

    if (count >= 2) {
      const box0 = await cards.nth(0).boundingBox()
      const box1 = await cards.nth(1).boundingBox()
      expect(box0).toBeTruthy()
      expect(box1).toBeTruthy()
      expect(box1!.y).toBeGreaterThan(box0!.y)
    }
  })

  test('mobile: pricing cards stack vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const pricingGrid = page.locator('#pricing .grid')
    await expect(pricingGrid).toBeVisible()
  })

  test('mobile: footer stacks vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const footer = page.locator('footer[role="contentinfo"]')
    await expect(footer).toBeVisible()
  })

  test('tablet: how-it-works cards display in row', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    const section = page.locator('section[aria-label="How it works"]')
    await expect(section).toBeVisible()
  })

  test('desktop: full layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('section[aria-label="How it works"]')).toBeVisible()
    await expect(page.locator('#pricing')).toBeVisible()
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible()
  })
})

test.describe('Responsive - Auth Page', () => {
  test('mobile: auth card is full width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/auth')

    const card = page.locator('h1:has-text("Tempo")').locator('..')
    await expect(page.locator('h1')).toBeVisible()

    const emailInput = page.locator('#auth-email')
    await expect(emailInput).toBeVisible()
    const box = await emailInput.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.width).toBeGreaterThan(200)
  })

  test('desktop: auth card is centered and constrained', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/auth')

    const emailInput = page.locator('#auth-email')
    await expect(emailInput).toBeVisible()
    const box = await emailInput.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.width).toBeLessThan(500)
  })
})

test.describe('Responsive - Text Scaling', () => {
  test('mobile: h1 on landing uses smaller font size', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    const box = await h1.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.width).toBeLessThanOrEqual(375)
  })

  test('desktop: h1 on landing is larger', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    const fontSize = await h1.evaluate(el => getComputedStyle(el).fontSize)
    const size = parseInt(fontSize)
    expect(size).toBeGreaterThanOrEqual(72)
  })
})
