import 'cypress-xpath';

export class HomePage {

  weblocators = {

    navWomen: '#ui-id-4',
    navTops: '#ui-id-9',
    navJackets: "//a[@id='ui-id-11']//span[contains(text(),'Jackets')]"
  }

  navigateToJacketsCategory() {

    cy.get(this.weblocators.navWomen).trigger('mouseover');
    cy.wait(300); // Wait for dropdown

    cy.get(this.weblocators.navTops).should('be.visible').trigger('mouseover');
    cy.wait(300); // Wait for nested dropdown

    cy.xpath(this.weblocators.navJackets).should('be.visible').click();
  }
}
