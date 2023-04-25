import { ProductsPage } from "../pages/ProductsPage"

const productsPage = new ProductsPage()
describe('a user is able to add products to my cart', () => {

    beforeEach(function () {
        productsPage.visit()
    })

    it('single product', function () {
        cy.get('[data-testId="productCard"]').eq(0)
            .within(() => {
                cy.get('[data-testid="addToCartButton"]').click()
                cy.get('[data-testid="addToCartButton"]')
                    .should('have.text', 'Add to cart (-1)')
            })
    })

    it.only('multiple products', () => {
        cy.get('[data-testId="productCard"]').eq(0)
            .within(() => {
                cy.get('[data-testid="addToCartButton"]').click()
                cy.get('[data-testid="addToCartButton"]').click()
                cy.get('[data-testid="addToCartButton"]')
                    .should('have.text', 'Add to cart (-2)')
            })

        cy.get('[data-testId="productCard"]').eq(1)
            .within(() => {
                cy.get('[data-testid="addToCartButton"]').click()
                cy.get('[data-testid="addToCartButton"]').click()
                cy.get('[data-testid="addToCartButton"]')
                    .should('have.text', 'Add to cart (-2)')
            })

    })



})