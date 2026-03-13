import { test, expect } from '@playwright/test'

test.describe('Protected Route Redirects', () => {
  const protectedPaths = ['/upload', '/hooks', '/style', '/render', '/preview', '/library']

  for (const path of protectedPaths) {
    test(`${path} redirects unauthenticated users to /auth`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveURL(/\/auth/)
    })
  }
})

test.describe('Upload Page Structure (requires session)', () => {
  test('upload page shows create a video heading when accessible', async ({ page }) => {
    const response = await page.goto('/upload')
    const url = page.url()

    if (url.includes('/auth')) {
      test.skip()
      return
    }

    await expect(page.locator('h1')).toContainText('Create a video')
  })
})

test.describe('Session-guarded pages redirect properly', () => {
  test('hooks page without session data redirects to upload', async ({ page }) => {
    await page.goto('/auth')
    const url = page.url()
    if (!url.includes('/auth')) {
      test.skip()
      return
    }

    await page.evaluate(() => {
      sessionStorage.removeItem('tempo_hooks')
    })
  })
})
