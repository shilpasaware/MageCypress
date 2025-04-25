import { faker } from '@faker-js/faker';


export class RegisterPage {

  // Store user credentials as class properties
  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  //Locators
  weblocators = {
    createAccountLink: 'Create an Account',
    firstName: '#firstname',
    lastName: '#lastname',
    email: '#email_address',
    password: '#password',
    passwordConfirm: '#password-confirmation',
    createAccountBtn: "(//span[contains(text(),'Create an Account')])[1]",
    successRegistrationMessage: "//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']",
    firstNameError: '#firstname-error',
    lastNameError: '#lastname-error',
    emailNameError: '#email_address-error',
    passwordError: '#password-error',
    passwordConfirmError: '#password-confirmation-error'
  }

  //Actions
  openURL() {
    cy.visit('/');
  }

  clickCreateAccount() {
    cy.contains('a', this.weblocators.createAccountLink).click();
  }

  fillFirstName(FName) {
    cy.get(this.weblocators.firstName).type(FName);
  }

  fillLastName(LName) {
    cy.get(this.weblocators.lastName).type(LName);
  }

  fillEmail(email) {
    cy.get(this.weblocators.email).type(email);
  }

  fillPassword(password) {
    cy.get(this.weblocators.password).type(password);
    cy.get(this.weblocators.passwordConfirm).type(password);
  }

  clickCreateAccountButton() {
    cy.xpath(this.weblocators.createAccountBtn).click();
  }

  verifyRegistrationSuccess() {
    //   //cy.log(`Success message: ${successRegistrationMessage}`);
    cy.contains('Thank you for registering with Main Website Store.').should('exist');
  }


  // Error Validation Methods
  verifyFirstNameError(expectedMessage) {
    cy.get(this.weblocators.firstNameError).should('contain', expectedMessage);
  }

  verifyLastNameError(expectedMessage) {
    cy.get(this.weblocators.lastNameError).should('contain', expectedMessage);
  }

  verifyEmailError(expectedMessage) {
    cy.get(this.weblocators.emailNameError).should('contain', expectedMessage);
  }

  verifyPasswordError(expectedMessage) {
    cy.get(this.weblocators.passwordError).should('contain', expectedMessage);
  }

  verifyPasswordConfirmError(expectedMessage) {
    cy.get(this.weblocators.passwordConfirmError).should('contain', expectedMessage);
  }

  // Methods
  createAnAccount() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email(firstName, lastName, 'example.com');
    const password = faker.internet.password(10, true, /[A-Za-z0-9]/, '!Aa1')

    this.clickCreateAccount()
    this.fillFirstName(firstName)
    this.fillLastName(lastName)
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickCreateAccountButton()
    //this.verifyRegistrationSuccess();
  }


  verifyAllRequiredFieldErrors(requiredErrorMessage) {
    this.verifyFirstNameError(requiredErrorMessage);
    this.verifyLastNameError(requiredErrorMessage);
    this.verifyEmailError(requiredErrorMessage);
    this.verifyPasswordError(requiredErrorMessage);
    //this.verifyPasswordConfirmError(requiredErrorMessage);

  }
  createAnAccount() {
    this.userData.firstName = faker.person.firstName();
    this.userData.lastName = faker.person.lastName();
    this.userData.email = faker.internet.email(
      this.userData.firstName,
      this.userData.lastName,
      'example.com'
    );
    this.userData.password = faker.internet.password(10, true, /[A-Za-z0-9]/, '!Aa1');

    // Save user data to Cypress environment for later use
    cy.wrap(this.userData).as('userData');

    this.clickCreateAccount();
    this.fillFirstName(this.userData.firstName);
    this.fillLastName(this.userData.lastName);
    this.fillEmail(this.userData.email);
    this.fillPassword(this.userData.password);
    this.clickCreateAccountButton();

    // Return the userData so it can be used elsewhere
    return this.userData;
  }
}

