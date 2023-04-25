import { CheckoutPage } from "../pages/CheckoutPage"
import { ProductsPage } from "../pages/ProductsPage"

const productsPage = new ProductsPage()
const checkoutPage = new CheckoutPage()

describe('a user is able to add products to my cart', () => {

    beforeEach(function () {
        productsPage.visit()
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

        checkoutPage.visit()
    })


    it.only('cart updates when products added', () => {


    })

    it('cart storage', () => { })
})