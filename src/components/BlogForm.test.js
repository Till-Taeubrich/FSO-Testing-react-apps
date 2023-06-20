import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm addBlog={addBlog} />)

  const titleInput = container.querySelector('.title-input input')
  const authorInput = container.querySelector('.author-input input')
  const urlInput = container.querySelector('.url-input input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title-test')
  await user.type(authorInput, 'author-test')
  await user.type(urlInput, 'https://www.test.com')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('title-test')
  expect(addBlog.mock.calls[0][0].author).toBe('author-test')
  expect(addBlog.mock.calls[0][0].url).toBe('https://www.test.com')
})