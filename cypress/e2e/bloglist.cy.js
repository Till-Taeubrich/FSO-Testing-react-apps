describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      const user = {
        username: 'test',
        password: 'test'
      }

      cy.request('POST', 'http://localhost:3003/api/login', user).should((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('fails with wrong credentials', function() {
      const user = {
        username: 'wrong credentials',
        password: 'wrong credentials'
      }

      cy.request({ 'method': 'POST', 'url': 'http://localhost:3003/api/login', user, failOnStatusCode: false }).should((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })
})