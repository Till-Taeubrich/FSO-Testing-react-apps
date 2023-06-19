import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/'
import Blog from './Blog'
import userEvents from '@testing-library/user-event'

const userEvent = userEvents.setup()

const mockHandler = jest.fn()

describe('<Blog />', () => {
  let container
  const blog = {
    author: 'test-author',
    likes: 1,
    title: 'test-title',
    url: 'test-url',
    user: {
      id: 123
    }
  }

  const user = {
    userId: 123,
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} increaseLikes={mockHandler} />).container
  })

  test('renders content', () => {

    const blogElement = container.querySelector('.blog')

    const blogTitle = blogElement.querySelector('.blog-title')
    const blogAuthor = blogElement.querySelector('.blog-author')

    const urlLikesContainer = blogElement.querySelector('.url-likes-container')

    expect(blogTitle).toBeDefined()
    expect(blogAuthor).toBeDefined()

    expect(urlLikesContainer).toHaveStyle('display: none')
  })

  test('clicking info-toggle-btn once shows all info', async () => {
    const infoToggleBtn = container.querySelector('.info-toggle-btn')
    const urlLikesContainer = container.querySelector('.url-likes-container')

    await userEvent.click(infoToggleBtn)

    expect(urlLikesContainer).toHaveStyle('display: block')
  })

  test('clicking info-toggle-btn once shows all info', async () => {
    const likeBtn = container.querySelector('.like-btn')

    await userEvent.dblClick(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})