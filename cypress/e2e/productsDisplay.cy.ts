import { ProductsPage } from "../pages/ProductsPage"

const productsPage = new ProductsPage()

const filterDataByProductTitle = (productTitleText) => {
  cy.fixture('products.json').then((productsData) => {
    const productData = productsData.filter((product) => product.title === productTitleText)
    expect(productData).to.have.lengthOf(1)
    return productData
  })
}
describe('On a product list page', () => {

  describe('a user is able to see', () => {

    beforeEach(() => {
      productsPage.visit()
    })

    it('product title', () => {
      productsPage.allProductCards()
        .each((productCard) => {
          cy.wrap(productCard).within(() => {
            productsPage.getProductCardTitle()
              .then((productCardTitleText) => { filterDataByProductTitle(productCardTitleText) })
              .then((productData: any) => {
                productsPage.productTitle()
                  .should('exist')
                  .should('be.visible')
                  .invoke('text')
                  .should('eq', productData[0].title)
              })
          })
        })
    })

    it('product image', () => {
      productsPage.allProductCards()
        .each((productCard, image) => {
          cy.wrap(productCard).within(() => {
            productsPage.productImage()
              .should('exist')
              .should('be.visible')
              .should('have.attr', 'src', `assets/images/${image}.jpg`)
          })
        })
    })

    it('product description', () => {
      productsPage.allProductCards()
        .each((productCard) => {
          cy.wrap(productCard).within(() => {
            productsPage.getProductCardTitle()
              .then((productCardTitleText) => { filterDataByProductTitle(productCardTitleText) })
              .then((productData: any) => {
                productsPage.productDescription()
                  .should('exist')
                  .should('be.visible')
                  .invoke('text')
                  .should('eq', productData[0].description)
              })
          })
        })
    })

    it('product price', () => {
      productsPage.allProductCards()
        .each((productCard) => {
          cy.wrap(productCard).within(() => {
            productsPage.getProductCardTitle()
              .then((productCardTitleText) => { filterDataByProductTitle(productCardTitleText) })
              .then((productData: any) => {
                productsPage.productPrice()
                  .should('exist')
                  .should('be.visible')
                  .invoke('text')
                  .should('eq', `$${productData[0].price}`)
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

    xit('product ordering', () => {

    })

  })
})