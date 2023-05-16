// change this test so if user already exists, it will redirect to login page
describe('template spec', () => {
  it('passes', () => {
      let email = getRandomEmail()
    cy.visit('http://127.0.0.1:8000/')
    cy.url().should('include', '/login')
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('testuser')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://127.0.0.1:8000/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('testuser')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://127.0.0.1:8000/')
    cy.get('button').contains('Add to cart').focus().click()
  })
})

function getRandomEmail() {
    let email = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++)
        email += possible.charAt(Math.floor(Math.random() * possible.length));
    return email + '@test.com';
}