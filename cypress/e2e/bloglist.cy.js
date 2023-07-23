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

    it('A blog can be created', function() {
      cy.addBlog()
    })

    it('A blog can be liked', function() {
      cy.addBlog().then(res => {
        const blog = res.body
        const blogId = res.body.id

        blog.likes = blog.likes + 1

        cy.request('PUT', `/api/blogs/${blogId}`, blog)

        cy.request('GET', '/api/blogs').should(res => {
          expect(res.body[0].likes).to.eq(2)
        })
      })
    })

    it('A blog can be deleted by the author', function() {

      cy.addBlog().then(res => {
        const blogId = res.body.id

        const token = `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`

        const config = {
          Authorization: token
        }

        cy.request({
          method: 'DELETE',
          url: `http://localhost:3003/api/blogs/${blogId}`,
          headers: config
        })
      })
    })

    it('Only the creator can see the blog delete button', function() {
      cy.addBlog()

      cy.then(() => {
        cy.visit('http://localhost:3000')

        cy.get('.info-toggle-btn').click()
        cy.get('.remove-btn')
      })

      cy.then(() => {
        localStorage.removeItem('loggedUser')
        cy.reload()

        const userr = {
          username: 'newUser',
          password: 'newUser'
        }

        cy.request('POST', 'http://localhost:3003/api/users', userr)

        cy.login(userr, 'failOnStatusCode')
        cy.visit('http://localhost:3000')

        cy.get('.info-toggle-btn').click()
        cy.get('.remove-btn').should('not.exist')
      })
    })

    it.only('Blogs are sorted with the most likes being first.', function() {
      cy.addMultipleBlogs()
      cy.reload()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the 2nd most likes')
      cy.get('.blog').eq(2).should('contain', 'The title with the least likes')
    })
  })
})