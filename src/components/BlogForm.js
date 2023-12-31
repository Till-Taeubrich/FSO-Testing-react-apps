import { useState } from 'react'

const BlogForm = ({
  addBlog,
  showNotification
}) => {

  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  const showWhenHidden = { display: blogFormVisible ? 'none' : '' }

  const toggleBlogForm = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  const handleTitle = (e) => {
    setTitleInput(e.target.value)
  }

  const handleAuthor = (e) => {
    setAuthorInput(e.target.value)
  }

  const handleUrl = (e) => {
    setUrlInput(e.target.value)
  }

  const handleNewBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: titleInput,
      author: authorInput,
      url: urlInput
    }

    try {
      addBlog(newBlog)
      setBlogFormVisible(false)
    } catch (error) {
      showNotification('adding new blog failed')
    }
  }


  return (
    <>
      <form onSubmit={ handleNewBlog } style={showWhenVisible}>
        <div className="title-input">
          <label htmlFor="title">title: </label>
          <input id="title" type="text" onChange={ handleTitle } />
        </div>
        <div className="author-input">
          <label htmlFor="author">author: </label>
          <input id="author" type="text" onChange={ handleAuthor } />
        </div>
        <div className="url-input">
          <label htmlFor="url">url: </label>
          <input id="url" type="text" onChange={ handleUrl } />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={toggleBlogForm} style={showWhenHidden}>Create new blog</button>
      <button onClick={toggleBlogForm} style={showWhenVisible}>Cancel</button>
    </>
  )
}

export default BlogForm