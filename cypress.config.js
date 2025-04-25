const { defineConfig } = require('cypress');
module.exports = defineConfig({
  
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com',
    //pageLoadTimeout: 120000, // Increase timeout
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  env:{
    URL:'https://magento.softwaretestingboard.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  }
});
