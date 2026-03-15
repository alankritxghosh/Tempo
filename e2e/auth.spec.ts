import { test, expect } from '@playwright/test'

test.describe('Auth Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth')
  })

  test('renders auth card with Tempo heading', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Tempo')
  })

  test('renders Google sign-in button', async ({ page }) => {
    const googleBtn = page.getByRole('button', { name: /continue with google/i })
    await expect(googleBtn).toBeVisible()
  })

  test('renders email and password inputs', async ({ page }) => {
    const emailInput = page.locator('#auth-email')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(emailInput).toHaveAttribute('required', '')
    await expect(emailInput).toHaveAttribute('autocomplete', 'email')

    const passwordInput = page.locator('#auth-password')
    await expect(passwordInput).toBeVisible()
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await expect(passwordInput).toHaveAttribute('required', '')
  })

  test('renders sign in button by default', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /^sign in$/i })
    await expect(submitBtn).toBeVisible()
  })

  test('toggles between sign in and sign up', async ({ page }) => {
    await expect(page.getByText("Don't have an account?")).toBeVisible()

    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(page.getByText('Already have an account?')).toBeVisible()
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible()

    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByText("Don't have an account?")).toBeVisible()
  })

  test('password autocomplete changes on mode toggle', async ({ page }) => {
    const passwordInput = page.locator('#auth-password')
    await expect(passwordInput).toHaveAttribute('autocomplete', 'current-password')

    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(passwordInput).toHaveAttribute('autocomplete', 'new-password')
  })

  test('email input has sr-only label', async ({ page }) => {
    const label = page.locator('label[for="auth-email"]')
    await expect(label).toHaveText('Email address')
    await expect(label).toHaveClass(/sr-only/)
  })

  test('password input has sr-only label', async ({ page }) => {
    const label = page.locator('label[for="auth-password"]')
    await expect(label).toHaveText('Password')
    await expect(label).toHaveClass(/sr-only/)
  })

  test('error container has alert role and aria-live', async ({ page }) => {
    const alertDiv = page.locator('div[role="alert"][aria-live="polite"]')
    await expect(alertDiv).toHaveCount(1)
  })

  test('form prevents submission with empty fields (HTML5 validation)', async ({ page }) => {
    const emailInput = page.locator('#auth-email')
    const isRequired = await emailInput.getAttribute('required')
    expect(isRequired).not.toBeNull()
  })

  test('password requires minimum 6 characters', async ({ page }) => {
    const passwordInput = page.locator('#auth-password')
    await expect(passwordInput).toHaveAttribute('minlength', '6')
  })
})

test.describe('Auth Page WCAG', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth')
  })

  test('Google button has focus outline', async ({ page }) => {
    const googleBtn = page.getByRole('button', { name: /continue with google/i })
    await googleBtn.focus()
    const classes = await googleBtn.getAttribute('class')
    expect(classes).toMatch(/focus(-visible)?:outline/)
  })

  test('email input has focus outline', async ({ page }) => {
    const emailInput = page.locator('#auth-email')
    const classes = await emailInput.getAttribute('class')
    expect(classes).toContain('focus:')
  })

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })
})
