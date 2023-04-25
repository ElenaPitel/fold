import { ProductsPage } from "../pages/ProductsPage"

const productsPage = new ProductsPage()

describe('On a product list page', () => {

    before(() => {
        productsPage.visit()
    })

    it('displays all products with correct information', () => {
        cy.fixture('products.json').then((productsData) => {
            productsPage.allProductCards().each((productCard, index) => {
                const productData = productsData[index]
                cy.wrap(productCard).within(() => {
                    productsPage.productTitle()
                        .should('be.visible')
                        .should('have.text', productData[0].title)
                    productsPage.productImage()
                        .should('be.visible')
                        .should('have.attr', 'src', `assets/images/${productData[0].filename}`)
                    productsPage.productDescription()
                        .should('be.visible')
                        .should('have.text', productData[0].description)
                    productsPage.productPrice()
                        .should('be.visible')
                        .should('have.text', `$${productData[0].price}`)
                })
            })
        })
    })

    it('displays all available products', () => {
        productsPage.allProductCards().should('have.length', 11)
            .each((productCard) => {
                cy.wrap(productCard).should('be.visible')
            })
    })

    xit('displays correct product ordering', () => { })
})