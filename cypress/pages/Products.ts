class ProductsPage {

    elements = {
        allPproductCards: () => cy.get('[data-testId="productCard"]'),

    }

    visit() {
        cy.visit("/")
        cy.location('pathname').should('eq', '/')
    }


}

module.exports = ProductsPage