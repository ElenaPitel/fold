export class ProductsPage {

    visit() {
        cy.visit("/")
        cy.location('pathname').should('eq', '/')
    }

    allProductCards() {
        return cy.get('[data-testId="productCard"]')
    }

    getProductCardTitle() {
        return cy.get('[data-testid="title"]').should('be.visible').invoke('text')
    }

    productTitle() {
        return cy.get('[data-testid="title"]')
    }

    productDescription() {
        return cy.get('[data-testid="description"]')
    }

    productPrice() {
        return cy.get('[data-testid="price"]')
    }

    productImage() {
        return cy.get('[data-testid="image"]')
    }

    getProductCard(index) {
        return cy.get('[data-testId="productCard"]').eq(index)
    }

    addToCartButton() {
        return cy.get('[data-testid="addToCartButton"]')
    }

    validateAddToCartButton(quantity) {
        this.addToCartButton().should('have.text', `Add to cart (-${quantity})`)
    }

    addProductToCartByIndex(index) {
        this.getProductCard(index).within(() => {
            this.addToCartButton().click();
        })
    }

}
