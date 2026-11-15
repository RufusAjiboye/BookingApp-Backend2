import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv'; // Import the dotenv package to load environment variables from a .env file
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },

    ignoreHTTPSErrors: true, // Ignore HTTPS errors for all tests.
    
    trace: 'on-first-retry',
  },
});
