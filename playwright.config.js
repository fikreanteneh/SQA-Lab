import { defineConfig } from '@playwright/test';

module.exports = defineConfig({
  testDir: './Lab5', //['./Lab1', './Lab2', './Lab3', './Lab4', './Lab5'],
  timeout: 300000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
