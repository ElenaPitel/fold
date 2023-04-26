export class CheckoutPage {

    visit() {
        cy.get('[href="/checkout"]').click()
        cy.location('pathname').should('eq', '/checkout')
    }

    cartRow() {
        return cy.get('[data-testId="cartRow"]')
    }

    cartRowByIndex(index) {
        return cy.get('[data-testId="cartRow"]').eq(index)
    }

    cartProductTitle(title) {
        return cy.get('[data-testId="productTitle"]').should('have.text', title)
    }

    cartProductPrice(price) {
        return cy.get('[data-testId="productPrice"]').should('contain', price)
    }

    cartProductQty(productQty) {
        return cy.get('[data-testId="productQty"]').should('contain', productQty)
    }

    cartTotalPrice() {
        return cy.get('[data-testid="totalPrice"]')
    }

    verifycartTotalPrice(price) {
        this.cartTotalPrice().should('have.text', `Total: $${price}`)
    }

    verifyRowsQty(expectedQty) {
        return cy.get('[data-testid="cartRow"]').should('have.length', `${expectedQty}`)
    }

    clickButton(button) {
        return cy.get('button').contains(button).click()
    }
}
