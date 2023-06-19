import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/'
import Blog from './Blog'

describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      author: 'test-author',
      likes: 1,
      title: 'test-title',
      url: 'test-url'
    }

    const { container } = render(<Blog blog={blog} />)

    const blogElement = container.querySelector('.blog')

    const blogTitle = blogElement.querySelector('.blog-title')
    const blogAuthor = blogElement.querySelector('.blog-author')

    const urlLikesContainer = blogElement.querySelector('.url-likes-container')

    expect(blogTitle).toBeDefined()
    expect(blogAuthor).toBeDefined()

    expect(urlLikesContainer).toHaveStyle('display: none')
  })

})