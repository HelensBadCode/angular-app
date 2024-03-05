import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/',
   retries: {runMode: 1, openMode: 1},
   specPattern: 'cypress/e2e/**/*.{cy, test}.{js,jsx,ts,tsx}',
   defaultCommandTimeout: 5000,
   viewportWidth: 1280,
   viewportHeight: 720,
   setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
