import { CheckoutPage } from '../pages/CheckoutPage'
import { NavigationBar } from '../pages/NavigationBar'
import { ProductsPage } from '../pages/ProductsPage'

let productsData
const productsPage = new ProductsPage()
const checkoutPage = new CheckoutPage()
const navBar = new NavigationBar()

describe('On a cart page', () => {

    describe('a basket state is preserved', () => {

        before(() => {
            cy.fixture('products.json').then((data) => {
                productsData = data
                productsPage.visit()
            })
        })

        beforeEach(function () {
            const productData = productsData[0]
            cy.wrap(productData).as('productData')
            productsPage.visit()
            productsPage.addProductsToCart(0, productData.qty)
        })

        it('when the user adds an item on product list page and navigates to checkout page', function () {
            navBar.navigateToCheckout()
            checkoutPage.cartProductTitle(this.productData.title)
            checkoutPage.cartProductPrice(this.productData.price)
            checkoutPage.cartProductQty(this.productData.qty)
        })

        it('when the user removes an item checkout page and navigates back to product list page', function () {
            navBar.navigateToCheckout()
            checkoutPage.clickButton('Remove')
            checkoutPage.verifyCartTotalPrice('0.00')

            navBar.navigateToProducts()
            productsPage.getProductCard(0).within(() => {
                productsPage.validateAddToCartButton(0)
            })
        })

        it('when the user adds multiple items on product list page and navigates to checkout page', function () {
            productsPage.addProductToCartByIndex(0)
            navBar.navigateToCheckout()
            checkoutPage.cartProductTitle(this.productData.title)
            checkoutPage.cartProductPrice(this.productData.price)
            checkoutPage.cartProductQty(2)
        })

        it('when the user adds additional item on checkout page and navigates back to to product list page', function () {
            navBar.navigateToCheckout()
            checkoutPage.clickButton('+')
            checkoutPage.cartProductQty(2)

            navBar.navigateToProducts()
            productsPage.getProductCard(0).within(() => {
                productsPage.validateAddToCartButton(2)
            })
        })
    })
})
