export class NavigationBar {

    navigateToCheckout() {
        cy.get('[href="/checkout"]').click()
        cy.location('pathname').should('eq', '/checkout')
    }

    navigateToProducts() {
        cy.get('[href="/"]').click()
        cy.location('pathname').should('eq', '/')
    }
}