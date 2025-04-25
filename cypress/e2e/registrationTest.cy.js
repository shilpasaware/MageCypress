import { RegisterPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from '../pages/CheckoutPage';
import userData from '../fixtures/userData.json'

const registerObj = new RegisterPage();
const loginPageObj = new LoginPage();
const checkoutPageObj = new CheckoutPage();

describe('TC_REG_001 - User Registration and Login Validation', () => {

  it('should register a new user and validate login', () => {

    registerObj.openURL()
    registerObj.clickCreateAccount()

    //Validate the error page
    registerObj.clickCreateAccountButton();
    registerObj.verifyAllRequiredFieldErrors(`${userData.requiredErrorMessage}`)

    // Create an Account and Validate success account creation
    registerObj.createAnAccount()

    // Sign out 
    checkoutPageObj.clickSignInTopToggleBtn()
    checkoutPageObj.clickSignOut()

    // Sign in with the same credentials
    loginPageObj.logInWithStoredCredentials();
    loginPageObj.validateSuccessfulSignIn();

  });

});
