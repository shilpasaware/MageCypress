import 'cypress-xpath';

export class CheckoutPage {

  weblocators = {
    signInToggleBtn: "(//button[@type='button'])[1]",
    signOut: "//div[@aria-hidden='false']//a[normalize-space()='Sign Out']",

    emailField: "//input[@id='customer-email']",
    firstNameField: "//input[@name='firstname']",
    lastNameField: "//input[@name='lastname']",
    companyField: "//input[@name='company']",

    // Address Fields
    streetAddress1Field: "//input[@name='street[0]']",
    streetAddress2Field: "//input[@name='street[1]']",
    cityField: "//input[@name='city']",
    stateDropdown: "//select[@name='region_id']",
    zipField: "//input[@name='postcode']",
    countryDropdown: "//select[@name='country_id']",
    phoneField: "//input[@name='telephone']",

    // Shipping Methods
    flatRateShipping: "//input[@value='flatrate_flatrate']",
    //freeShipping: "//input[@value='freeshipping_freeshipping']",

    // Navigation and Action Buttons
    nextButton: "//button[@data-role='opc-continue']",
    placeOrderButton: "//button[@title='Place Order']",

    // Payment Information
    creditCardRadio: "//input[@id='braintree']",
    creditCardNumber: "//input[@id='braintree_cc_number']",
    creditCardExpDate: "//input[@id='braintree_cc_exp_date']",
    creditCardCVV: "//input[@id='braintree_cc_cid']",

    // Order Summary
    orderSummary: "//div[contains(@class,'opc-summary-wrapper')]",
    subtotalAmount: "//tr[@class='totals sub']/td/span",
    shippingAmount: "//tr[@class='totals shipping excl']/td/span",
    taxAmount: "//tr[@class='totals-tax']/td/span",
    orderTotal: "//tr[@class='grand totals']/td/strong/span",
    thankYouMessage: "//h1/span[contains(text(),'Thank you for your purchase!')]"
  }

  //Actions

  clickSignInTopToggleBtn() {
    cy.xpath(this.weblocators.signInToggleBtn).click();
  }

  clickSignOut() {
    cy.xpath(this.weblocators.signOut).click();
  }

  // Fill email address
  fillEmailAddress(email) {
    cy.xpath(this.weblocators.emailField).clear().type(email);
  }

  // Fill shipping information
  fillShippingAddress(shippingInfo) {
    cy.xpath(this.weblocators.firstNameField).clear().type(shippingInfo.firstName);
    cy.xpath(this.weblocators.lastNameField).clear().type(shippingInfo.lastName);

    if (shippingInfo.company) {
      cy.xpath(this.weblocators.companyField).clear().type(shippingInfo.company);
    }

    cy.xpath(this.weblocators.streetAddress1Field).clear().type(shippingInfo.street1);

    if (shippingInfo.street2) {
      cy.xpath(this.weblocators.streetAddress2Field).clear().type(shippingInfo.street2);
    }

    cy.xpath(this.weblocators.cityField).clear().type(shippingInfo.city);
    cy.xpath(this.weblocators.stateDropdown).select(shippingInfo.state);
    cy.xpath(this.weblocators.zipField).clear().type(shippingInfo.zip);
    cy.xpath(this.weblocators.countryDropdown).select(shippingInfo.country);
    cy.xpath(this.weblocators.phoneField).clear().type(shippingInfo.phone);
  }

  // Select shipping method
  selectFlatRateShipping() {
    cy.xpath(this.weblocators.flatRateShipping).check();
  }

  selectFreeShipping() {
    cy.xpath(this.weblocators.freeShipping).check();
  }

  // Click next button to proceed to payment
  clickNextButton() {
    cy.xpath(this.weblocators.nextButton).click();
    // Wait for payment section to be visible
    cy.wait(2000); // Basic wait for page transition
  }

  // Fill credit card information
  fillCreditCardInfo(cardInfo) {
    cy.xpath(this.weblocators.creditCardRadio).check();

    // Handle iframe if present (common for credit card forms)
    cy.xpath("//iframe[contains(@id,'braintree-hosted-field-number')]").then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('#credit-card-number').type(cardInfo.number);
    });

    cy.xpath("//iframe[contains(@id,'braintree-hosted-field-expirationDate')]").then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('#expiration').type(cardInfo.expiry);
    });

    cy.xpath("//iframe[contains(@id,'braintree-hosted-field-cvv')]").then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('#cvv').type(cardInfo.cvv);
    });
  }

  // Place order final step
  placeOrder() {
    cy.xpath(this.weblocators.placeOrderButton).click();
    // Wait for success page
    cy.wait(3000); // Basic wait for order processing
  }

  // Get order total
  getOrderTotal() {
    return cy.xpath(this.weblocators.orderTotal).invoke('text').then(text => {
      return parseFloat(text.replace(/[^0-9.]/g, ''));
    });
  }

  // Complete checkout in one go
  completeCheckout(customerInfo) {
    this.fillEmailAddress(customerInfo.email);
    this.fillShippingAddress(customerInfo.shipping);
    this.selectFlatRateShipping();
    this.clickNextButton();
    this.fillCreditCardInfo(customerInfo.payment);
    this.placeOrder();
  }

  getOrderNumber() {
    return cy.xpath("//span[@class='order-number']")
      .invoke('text')
      .then(orderNumber => {
        // Log the order number to console
        cy.log(`Order number: ${orderNumber}`);
        console.log(`Order number: ${orderNumber}`);
        return orderNumber;
      });
  }
  verifySuccessPage() {
    cy.xpath(this.weblocators.thankYouMessage).should('be.visible');
    return this;
  }
}

