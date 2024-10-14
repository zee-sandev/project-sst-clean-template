import { test, expect } from '@playwright/test'
import gmail from 'gmail-tester'
import GmailConfig from './gmail/config'
import { generatePassword } from '../utils/password.util'

test.describe.configure({ mode: 'serial' })
test.describe('Authentication by Cognito', () => {
  const email = `suphachok.dev+signup-${Math.random().toString(36).substring(2, 15)}@gmail.com`
  const password = generatePassword()
  // console.log(email)
  // console.log(password)
  test('Sign up with email and confirm email', async ({ page }) => {
    await page.goto('/')

    const signOutButton = page.getByRole('button', { name: 'Sign Out' })
    if (await signOutButton.isVisible()) {
      await signOutButton.click()
    }
    await page.getByRole('link', { name: 'Sign In' }).click()
    await page.getByRole('tab', { name: 'Register' }).click()

    await page.getByPlaceholder('Enter your name').click()
    await page.getByPlaceholder('Enter your name').fill(email)
    await page.getByPlaceholder('Enter your email').click()
    await page.getByPlaceholder('Enter your email').fill(email)
    await page.getByPlaceholder('Create a password').click()
    await page.getByPlaceholder('Create a password').fill(password)
    await page.getByPlaceholder('Confirm your password').click()
    await page.getByPlaceholder('Confirm your password').fill(password)
    await page.getByRole('button', { name: 'Register', exact: true }).click()

    await new Promise((resolve) => setTimeout(resolve, 5000)) // Delay for 5 seconds to allow for mail send

    const message = await gmail.get_messages(
      GmailConfig.credentialsPath,
      GmailConfig.tokenPath,
      {
        to: email,
        include_body: true
      }
    )
    const body = message[0]?.body // Use optional chaining to avoid null reference
    const verificationCodeMatch = body?.html.match(/(\d+)/)
    const verificationCode = verificationCodeMatch
      ? verificationCodeMatch[1]
      : null // Safely extract the verification code
    expect(verificationCode).toBeDefined()

    await page.getByPlaceholder('Enter your confirmation code').click()
    if (verificationCode) {
      await page
        .getByPlaceholder('Enter your confirmation code')
        .fill(verificationCode) // Use the retrieved confirmation code
    } else {
      throw new Error('Verification code is not defined')
    }
    await page.getByRole('button', { name: 'Confirm' }).click()

    await expect(page).toHaveURL('/auth') // Check that the page URL is '/'
  })

  test('Sign in and Sign out with email and password', async ({ page }) => {
    await page.goto('/') // Using the base URL configured in playwright.config.ts
    await page.getByRole('link', { name: 'Sign In' }).click()
    await page.getByPlaceholder('Enter your email').click()
    await page.getByPlaceholder('Enter your email').fill(email)
    await page.getByPlaceholder('Enter your password').click()
    await page.getByPlaceholder('Enter your password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/') // Check that the page URL is '/'
    await page
      .getByRole('button', { name: 'Sign Out' })
      .waitFor({ state: 'visible', timeout: 10000 }) // Wait for the Sign Out button to be visible
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible() // Verify that the Sign Out button is present

    await page.getByRole('button', { name: 'Sign Out' }).click() // Click the Sign Out button
    await expect(page).toHaveURL('/') // Check that the page URL is '/auth' after sign out
    await expect(
      page.getByRole('button', { name: 'Sign Out' })
    ).not.toBeVisible() // Verify that the Sign Out button is no longer visible
  })
})
