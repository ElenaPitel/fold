import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    video: false,
    retries: 1,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    baseUrl: "http://localhost:3000/",
  },
})
