import 'cypress-xpath';

export class ProductPage {

  //Locators
  weblocators = {
    productItem: '.product-item',
    productNameLink: '.product-item-link',
    jacket: "//a[text()='Jackets']",
    price: '.price-final_price .price',
    addToCartButton: '#product-addtocart-button',
    successMessage: '.message-success',
    successAddMessage: "//div[contains(text(),'You added ')]",
    cartIcon: "//div[@class='minicart-wrapper']/a//span[@class='counter qty']",
    viewCartLink: "//span[text()='View and Edit Cart']",
    subtotalPrice: "//tr[@class='grand totals']//span[@class='price']",
    search: '.search',
    searchIcon: "//input[@id='search']",
    //searchIconWL: "//*[@id='search_mini_form']/div[2]/button",
    searchIconWL: "//div[@id='search_autocomplete']//li[1]/span[1]",
    hereLink: "//div[contains(@class, 'message-success')]//a[text()='here']"
  }

  //Actions

  visitJacketsPage() {
    cy.visit('/women/tops-women/jackets-women.html');
  }

  visitJacketsPage() {
    cy.visit('/women/tops-women/jackets-women.html')
  }

  searchProductByName(productName) {
    //cy.get(this.weblocators.search).clear()
    cy.get(this.weblocators.search).first().type(productName)
    cy.xpath(this.weblocators.searchIcon, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

  }

  selectProductByName(name) {
    // More reliable product selection
    cy.contains(this.weblocators.productNameLink, name, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    // Wait for product page to load completely
    cy.get(this.weblocators.addToCartButton).should('be.visible')
    cy.wait(2000);
  }

  searchProductWishlist(productName) {
    //cy.get(this.weblocators.search).clear()
    cy.get(this.weblocators.search).first().type(productName)
    cy.xpath(this.weblocators.searchIconWL, { multiple: true, timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

  }

  selectProductWishlist(name) {
    // More reliable product selection
    cy.contains(this.weblocators.productNameLink, name, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    // Wait for product page to load completely
    //cy.get(this.weblocators.addToCartButton).should('be.visible')
    cy.wait(2000);
  }


  selectSize(size) {
    // Get the size attribute container first
    cy.get('.swatch-attribute.size')
      .should('be.visible')
      .scrollIntoView()
      .within(() => {
        // Find and click the size option with the exact text
        cy.get(`.swatch-option.text`)
          .contains(size)
          .should('be.visible')
          .click({ force: true });

        // Verify selection was successful
        cy.get('.swatch-option.selected').should('exist');
      });
  }


  selectColor(color) {
    // Get the color attribute container first
    cy.get('.swatch-attribute.color')
      .should('be.visible')
      .scrollIntoView()
      .within(() => {
        // Find and click the color option with matching option-label
        cy.get(`.swatch-option.color[option-label="${color}"]`)
          .should('be.visible')
          .click({ force: true });

        // Verify selection was successful
        cy.get('.swatch-option.selected').should('exist');
      });
  }

  selectGoBackToJacket() {
    cy.xpath(this.weblocators.jacket).click({ timeout: 30000 })
  }
  selectHereToContinue() {
    cy.xpath(this.weblocators.hereLink).click({ timeout: 10000 })
  }

  getProductPrice() {
    return cy.get('.price-final_price .price')
      .first()
      .invoke('text')
      .then(priceText => {
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        cy.log(`Product price: $${price.toFixed(2)}`);
        return cy.wrap(price); // Using cy.wrap() to maintain the Cypress chain
      });
  }


  addToCart() {
    cy.get(this.weblocators.addToCartButton).click({ timeout: 30000 })
    cy.xpath(this.weblocators.successAddMessage).should('contain', 'You added')
  }

  openCart() {
    // Go directly to the cart page URL
    cy.visit('/checkout/cart');

    // Verify cart page loaded
    cy.get('.cart-summary').should('exist');
  }


  getSubtotal() {
    return cy.xpath("//tr[@class='grand totals']//span[@class='price']")
      .invoke('text')
      .then(text => {
        const subtotal = parseFloat(text.replace(/[^0-9.]/g, ''));
        cy.log(`Cart subtotal: $${subtotal.toFixed(2)}`);
        return cy.wrap(subtotal); // Using cy.wrap() to maintain the Cypress chain
      });
  }

}

