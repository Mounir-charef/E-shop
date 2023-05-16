describe('Login, browsing to a product and try to buy it', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8000/')
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').type('a@a.com')
    cy.get('input[name="password"]').type('adminuser')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://127.0.0.1:8000/')

    // try to click on a first product image
    cy.get('img').first().click()
    cy.url().should('include', '/200')
    cy.get('button').contains('Add to cart').focus().click()
    cy.log('User logged in and tried to buy item')
  })
})