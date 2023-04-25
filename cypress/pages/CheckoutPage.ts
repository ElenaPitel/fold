export class CheckoutPage {

    visit() {
        cy.get('[href="/checkout"]').click()
        cy.location('pathname').should('eq', '/checkout')
    }
}