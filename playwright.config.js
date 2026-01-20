import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 0,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: process.env.BASE_URL_PIHR_PROD,
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'retain-on-failure',
    geolocation: { latitude: 23.8103, longitude: 90.4125 },
    launchOptions: {
      args: [
        '--disable-web-security',
        '--start-maximized',
      ],
    },
  },
  reporter: [
    ['list'], // default console output
    ['allure-playwright'] // Allure report
  ],

  projects: [
    {
      name: 'PIHR Apis Automation',
      use: {
        baseURL: process.env.BASE_URL_PIHR_PROD,
      },
    },
  ],
});
