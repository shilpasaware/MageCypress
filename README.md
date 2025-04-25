# MageCypress E2E Testing Framework

This repository contains automated end-to-end tests for the Magento e-commerce application using Cypress.

## Project Structure

```
cypress/
├── e2e/                      # Test files
│   ├── registrationTest.cy.js
│   ├── placeOrderTest.cy.js
│   ├── wishlistTest.cy.js
│   └── searchTest.cy.js
├── fixtures/                 # Test data
│   ├── productData.json
│   ├── userData.json
│   └── wishlistData.json
├── pages/                    # Page Object Model classes
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── RegistrationPage.js
│   └── WishlistPage.js
├── screenshots/              # Captured screenshots
└── support/                  # Support files
    ├── commands.js
    ├── e2e.js
    └── index.js
```

## Test Cases Overview

| ID | Description | Status |
|----|-------------|--------|
| A | Registration flow with login validation | ✅ Completed & Passing |
| B | Place order with multiple products (with price calculation checks) | ✅ Completed & Passing |
| C | Add products in Wishlist and checkout from wishlist | ⚠️ Completed but Failing |
| D | Search and validate results | ❌ Not Implemented |

## Execution Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
2. Navigate to the project root
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests
- To run tests using Cypress Test Runner:
  ```bash
  npx cypress open
  ```
  
This will open the Cypress Test Runner interface where you can select and run specific test files.

### Test Reports
- Reporting functionality not yet implemented due to time constraints
- Plans to add HTML reporting and test summary in future iterations

## Status Notes

### Test Case A: Registration Flow
- ✅ User registration with validation
- ✅ Login with registered credentials
- ✅ Validation of registration form fields

### Test Case B: Place Order Flow
- ✅ Product selection and cart addition
- ✅ Checkout process with shipping and payment
- ✅ Order confirmation with order number capture
- ✅ Price calculation validation

### Test Case C: Wishlist Flow
- ✅ Adding products to wishlist
- ❌ Adding products from wishlist to cart (FAILING)
- ❌ Checkout from wishlist (FAILING)
- ⚠️ Needs debugging for the "Add to Cart" functionality from wishlist page

### Test Case D: Search Functionality
- ❌ Not fully implemented due to time constraints
- ⚠️ Basic test structure is available but needs completion

## Known Issues
- Wishlist test fails when attempting to add products from wishlist to cart
- Search test requires implementation
- Reporting needs refinement for better visualization of test results

## Future Enhancements
- Implement multiple `it` blocks for better test organization
- Apply hooks for better test setup and teardown
- Complete Test Case D: Search functionality
- Fix wishlist "Add to Cart" functionality
- Enhance reporting with detailed test steps and screenshots
- Add data-driven tests for multiple product variations
- Implement CI/CD pipeline integration
- Add cross-browser testing capabilities

## Dependencies
- cypress
- cypress-mochawesome-reporter
- cypress-xpath# MageCypress
