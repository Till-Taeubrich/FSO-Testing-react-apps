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

      cy.login(user, 'failOnStatusCode').should((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('fails with wrong credentials', function() {
      const user = {
        username: 'wrong credentials',
        password: 'wrong credentials'
      }

      cy.login(user).should((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        username: 'test',
        password: 'test'
      }

      cy.login(user, 'failOnStatusCode')
      cy.visit('http://localhost:3000')
    })

    it.only('A blog can be created', function() {
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
  })

})