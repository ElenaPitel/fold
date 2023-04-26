import { CheckoutPage } from '../pages/CheckoutPage'
import { ProductsPage } from '../pages/ProductsPage'

let productsData
const productsPage = new ProductsPage()
const checkoutPage = new CheckoutPage()

const cartUpdateEvents = [
    { condition1: 'single item', condition2: 'is removed', rowIndex: 0, button: 'Remove', finalRowQty: 1, totalPrice: '58.90' },
    { condition1: 'single item', condition2: 'quantity reduced', rowIndex: 0, button: '-', finalRowQty: 2, totalPrice: '58.90', newItemQty: '0' },
    { condition1: 'one item from multiple items', condition2: 'are removed', rowIndex: 1, button: 'Remove', finalRowQty: 1, totalPrice: '28.10' },
    { condition1: 'one item from multiple items', condition2: 'quantity reduced', rowIndex: 1, button: '-', finalRowQty: 2, totalPrice: '57.55', newItemQty: '1' },
    { condition1: 'single item', condition2: 'added', rowIndex: 0, button: '+', finalRowQty: 2, totalPrice: '115.10', newItemQty: '2' }
]

describe('On a cart page', () => {

    describe('a user should be able to', () => {

        before(() => {
            cy.fixture('products.json').then((data) => {
                productsData = data
                productsPage.visit()
            })
        })

        beforeEach(() => {
            productsPage.visit()
            productsPage.addProductToCartByIndex(0)
            productsPage.addProductToCartByIndex(1)
            productsPage.addProductToCartByIndex(1)
            checkoutPage.visit()
        })

        it('see items and their quantities already added', () => {
            checkoutPage.cartRow().each((row, index) => {
                const productData = productsData[index]
                cy.wrap(row).within(() => {
                    checkoutPage.cartProductTitle(productData.title)
                    checkoutPage.cartProductPrice(productData.price)
                    checkoutPage.cartProductQty(productData.qty)
                })
            })
            checkoutPage.verifyRowsQty(2)
            checkoutPage.verifycartTotalPrice('87.00')
        })


        cartUpdateEvents.forEach((event) => {
            it(`see cart updates when ${event.condition1} ${event.condition2}`, () => {
                const productData = productsData[event.rowIndex]
                checkoutPage.cartRowByIndex(event.rowIndex)
                    .within(() => {
                        checkoutPage.cartProductTitle(productData.title)
                        checkoutPage.clickButton(event.button)
                        if (event.button !== 'Remove') {
                            checkoutPage.cartProductQty(event.newItemQty)
                        }
                    })
                checkoutPage.verifyRowsQty(event.finalRowQty)
                checkoutPage.verifycartTotalPrice(event.totalPrice)
            })
        })
    })
})