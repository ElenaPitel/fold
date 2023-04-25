import ProductsPage from "../pages/Products"

const productsPage = new ProductsPage()


describe('scription, and price', () => {



  it.only('list of products with attributes', () => {
    cy.visit('')
    cy.location('pathname').should('eq', '/')

    const productCards = cy.get('[data-testId="productCard"]')
    productCards.should('have.length', 11)

    productCards.each((card) => {
      // Perform actions on each element in the array
      cy.wrap(card).should('be.visible')
        .within(() => {

          const elTitle = cy.get('[data-testid="title"]').invoke('text')
            .then((elTitleText) => {
              cy.log(elTitleText)
              cy.fixture('products.json')
                .then((products) => {

                  const newArr = products.filter((el) => el.title === elTitleText)
                  cy.log(newArr)
                  cy.get('[data-testid="title"]').should('be.visible').invoke('text').should('exist').should('eq', newArr[0].title)
                  // cy.get('[data-testid="description"]').invoke('text').should('exist').should('eq', products[0].description)
                  // cy.get('[data-testid="price"]').invoke('text').should('contain', '$')
                  // cy.get('[data-testid="image"]').should('be.visible').should('have.attr', 'src')

                })
            })
        })
    })
  })

  xit('title', () => {

  })

  xit('image', () => {

  })

  xit('description', () => {

  })

  xit('product ordering', () => {

  })

  it('displays correct price of a product', () => {

  })

})