// File: PlaceOrderTest.js or similar
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { RegisterPage } from "../pages/RegistrationPage";
import userData from '../fixtures/userData.json';
import productData from '../fixtures/productData.json';

const loginPageObj = new LoginPage();
const homePageObj = new HomePage();
const productPageObj = new ProductPage();
const registerPageObj = new RegisterPage();

describe('Add specific products and validate cart subtotal', () => {
  it('adds products and checks the total price', () => {
    // To store all price promises
    const pricePromises = [];
    
    // Test flow
    registerPageObj.openURL();
    loginPageObj.logInMagentoApplication(userData.email, userData.password);
    
    // Navigate to jackets category
    homePageObj.navigateToJacketsCategory();
    
    // Add products into cart
    cy.wrap(productData.Products).each((product) => {
      productPageObj.searchProductByName(product.name);
      productPageObj.selectProductByName(product.name);
      productPageObj.selectSize(product.size);
      productPageObj.selectColor(product.color);
      
      // Get the price 
      productPageObj.getProductPrice().then(price => {
        pricePromises.push(price);
        productPageObj.addToCart();
      });
      
      productPageObj.selectGoBackToJacket();
    }).then(() => {
      // After all products are processed, calculate the total
      let totalPrice = 0;
      pricePromises.forEach(price => {
        totalPrice += price;
      });
      
      cy.log(`Total calculated price: $${totalPrice.toFixed(2)}`);
      
      // Open cart and verify subtotal
      productPageObj.openCart();
      productPageObj.getSubtotal().then(subtotal => {
        cy.log(`Cart subtotal: $${subtotal.toFixed(2)}`);
        
        // toBe.closeTo for floating point comparison check
        expect(subtotal).to.be.closeTo(totalPrice, 0.01);
      });
    });
  });
});




















//--------------------

// import { LoginPage } from "../pages/LoginPage";
// import { HomePage } from "../pages/HomePage";
// import { ProductPage } from "../pages/ProductPage";
// import { RegisterPage } from "../pages/RegistrationPage";
// import userData from '../fixtures/userData.json'
// import productData from '../fixtures/productData.json'

// const loginPageObj = new LoginPage();
// const homePageObj = new HomePage();
// const productPageObj = new ProductPage();
// const registerPageObj = new RegisterPage();


// describe('Add specific products and validate cart subtotal', () => {
//   it('adds products and checks the total price', () => {
//     const prices = []
//     let totalPrices = 0
//     registerPageObj.openURL()
//     loginPageObj.logInMagentoApplication(userData.email, userData.password)

//     //loginPageObj.verifyLoginSuccess()

//     // Navigate to jacketsCategory
//     homePageObj.navigateToJacketsCategory()

//     // === Add Products and validate value ===
//     for (let index = 0; index < productData.Products.length; index++) {
//       productPageObj.searchProductByName(productData.Products[index].name)
//       productPageObj.selectProductByName(productData.Products[index].name)
//       productPageObj.selectSize(productData.Products[index].size)
//       productPageObj.selectColor(productData.Products[index].color)
//       productPageObj.getProductPrice().then(price=> {
        
//         totalPrices = totalPrices+price
//         productPageObj.addToCart();
//       });
//       productPageObj.selectGoBackToJacket();
//     }
//     productPageObj.openCart();
//     productPageObj.getSubtotal().then(subtotal => {
//     expect(subtotal).to.be.equal(totalPrices);

//     });
//   });
// });
//---------
