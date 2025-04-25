
export class LoginPage {

  //Locators
  weblocators = {

    signInLink: "div[class='panel header'] li[data-label='or'] a",
    email: '#email',
    password: '#pass',
    signInBtn: "fieldset[class='fieldset login'] div[class='primary'] span",
    loggedIn: "div[class='panel header'] span[class='logged-in']",
    signInToggleBtn: "(//button[@type='button'])[1]",
    //signOut: "div[aria-hidden='false'] li[data-label='or'] a"
    signOut: "//div[@aria-hidden='false']//a[normalize-space()='Sign Out']",

    welcomeMessage: ".panel.header .logged-in",
    myAccountHeader: "h1.page-title",
    dashboardMessage: ".block-dashboard-info"

  }
  // Actions
  visitSignInLink() {
    cy.get(this.weblocators.signInLink).click();
  }

  enterEmail(email) {
    cy.get(this.weblocators.email).type(email);
  }

  enterPassword(password) {
    cy.get(this.weblocators.password).type(password);
  }

  clickSignInBtn() {
    cy.get(this.weblocators.signInBtn).click();
  }

  verifyLoginSuccess(loginMessage) {
    cy.contains(loginMessage).should('exist');
  }

  clickLoggedIn() {
    cy.get(this.weblocators.loggedIn, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Welcome');
  }

  clickSignInTopToggleBtn() {
    cy.xpath(this.weblocators.signInToggleBtn).click();
  }

  clickSignOut() {
    cy.xpath(this.weblocators.signOut).click();
  }

  // Add a method to use stored credentials
  logInWithStoredCredentials() {
    cy.get('@userData').then(userData => {
      this.visitSignInLink();
      this.enterEmail(userData.email);
      this.enterPassword(userData.password);
      this.clickSignInBtn();
    });
  }

  //Methods

  logInMagentoApplication(username, password) {

    this.visitSignInLink()
    this.enterEmail(username)
    this.enterPassword(password)
    this.clickSignInBtn()

  }

  validateSuccessfulSignIn() {
    // Check for welcome message that contains the user's name
    cy.get(this.weblocators.welcomeMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Welcome');

    // Verify we are on the customer dashboard
    cy.url().should('include', '/customer/account/');

    // Verify the My Account header is visible
    cy.get(this.weblocators.myAccountHeader)
      .should('be.visible')
      .and('contain.text', 'My Account');

    // Alternatively, verify the dashboard welcome message
    cy.get(this.weblocators.dashboardMessage)
      .should('be.visible');

    cy.log('User successfully signed in');
  }

}


