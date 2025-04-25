// File: pages/WishlistPage.js
import 'cypress-xpath';

export class WishlistPage {

  weblocators = {
    addToWishlist: '.product-social-links .action.towishlist',
    successMessage: '.message-success',
    addToCart: '.action.tocart',
    proceedToCheckout: '#top-cart-btn-checkout',
    addAllToCart: "//span[text()='Add All to Cart']"
  }

  // current product to wishlist
  addToWishlist() {
    cy.get(this.weblocators.addToWishlist).click();
    cy.get(this.weblocators.successMessage).should('be.visible');
  }

  // Open wishlist page
  openWishlist() {
    cy.visit('/wishlist');
  }

  // Add product from wishlist to cart
  addToCart(productName) {
    cy.contains(productName)
      .closest('.product-item')
      .find(this.weblocators.addToCart)
      .click();
    cy.get(this.weblocators.successMessage).should('be.visible');
  }

  // Go to checkout
  proceedToCheckout() {
    cy.get(this.weblocators.proceedToCheckout).click();
  }

  addToCartFromWishList() {
    cy.get(this.weblocators.addAllToCart).click();
  }
}
