import { ProductsPage } from "../pages/ProductsPage"

const productsPage = new ProductsPage()

describe('On a product list page', () => {

    describe('a user should see', () => {

        beforeEach(() => {
            productsPage.visit()
        })

        it('all products with correct information', () => {
            cy.fixture('products.json').then((productsData) => {
                productsPage.allProductCards().each((productCard, index) => {
                    const productData = productsData[index]
                    cy.wrap(productCard).within(() => {
                        productsPage.productTitle()
                            .should('be.visible')
                            .should('have.text', productData.title)
                        productsPage.productImage()
                            .should('be.visible')
                            .should('have.attr', 'src', `assets/images/${productData.filename}`)
                        productsPage.productDescription()
                            .should('be.visible')
                            .should('have.text', productData.description)
                        productsPage.productPrice()
                            .should('be.visible')
                            .should('have.text', `$${productData.price}`)
                    })
                })
            })
        })

        it('all available products', () => {
            productsPage.allProductCards().should('have.length', 11)
                .each((productCard) => {
                    cy.wrap(productCard).should('be.visible')
                })
        })

        xit('correct product ordering', () => {

        })

    })

    describe('a user should be be able to add products to cart', () => {

        const addProductsToCart = (productIndex, quantity) => {
            productsPage.getProductCard(productIndex).within(() => {
                for (let i = 0; i < quantity; i++) {
                    productsPage.addToCartButton().click()
                }
                productsPage.validateAddToCartButton(quantity)
            })
        }

        beforeEach(() => {
            productsPage.visit()
        })

        it('single product', () => {
            addProductsToCart(0, 1)
        })

        it('multiple quantity', () => {
            const randomQty = Math.floor(Math.random() * 5) + 1
            addProductsToCart(1, randomQty)
        })

        it('multiple products', () => {
            const firstRandomQty = Math.floor(Math.random() * 5) + 1
            const secondRandomQty = Math.floor(Math.random() * 5) + 1
            addProductsToCart(2, firstRandomQty)
            addProductsToCart(3, secondRandomQty)
        })
    })
})
