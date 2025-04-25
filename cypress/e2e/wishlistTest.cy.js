// File: cypress/e2e/wishlistTest.cy.js
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { RegisterPage } from "../pages/RegistrationPage";
import { WishlistPage } from "../pages/WishlistPage";
import wishlistData from '../fixtures/wishlistData.json';

const loginPage = new LoginPage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();
const wishlistPage = new WishlistPage();
const registerPageObj = new RegisterPage();

describe('Checkout Process', () => {
  it('should complete checkout and capture order number', () => {
    // Login to the account
    registerPageObj.openURL();
    loginPage.logInMagentoApplication(wishlistData.userData.email, wishlistData.userData.password);

    // For each product
    cy.wrap(wishlistData.products).each((product) => {
      // Search for the product
      productPage.searchProductWishlist(product.name);

      // Select the product from search results
      productPage.selectProductWishlist(product.name);

      // Select options
      productPage.selectSize(product.size);
      productPage.selectColor(product.color);

      // Add to wishlist
      wishlistPage.addToWishlist();

      // Optional: Go back to product listing
      // cy.go('back');
    });

    // Open wishlist
    wishlistPage.openWishlist();

    // Add first product to cart
    //wishlistPage.addToCart(wishlistData.products[0].name);
    wishlistPage.addToCartFromWishList();
    // Proceed to checkout
    //cy.visit('/checkout');
    productPage.openCart();

    //validate the cart for product 
    // To be Implimented in future (During debugging recognised)
      

    // Fill shipping info using data from the JSON file
    checkoutPage.fillShippingAddress(wishlistData.shipping);
    checkoutPage.selectFlatRateShipping();
    checkoutPage.clickNextButton();

    // Place order
    cy.xpath("//button[@title='Place Order']").click();

    // On success page, get the order number
    checkoutPage.verifySuccessPage();
    checkoutPage.getOrderNumber().then(orderNumber => {
      cy.log(`Order number: ${orderNumber}`);
    });
  });
});