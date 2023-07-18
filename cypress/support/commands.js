// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ( user, failOnStatusCode ) => {
  if (failOnStatusCode) {
    cy.request('POST', 'http://localhost:3003/api/login', user).then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
    })
    return
  }

  cy.request({ 'method': 'POST', 'url': 'http://localhost:3003/api/login', 'failOnStatusCode': false, body: user }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
  })
})

Cypress.Commands.add('addBlog', () => {
  const token = `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`

  const config = {
    Authorization: token
  }

  const blog = {
    'title': 'test',
    'author': 'test',
    'url': 'test',
    'likes': 1
  }

  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: config
  })
})