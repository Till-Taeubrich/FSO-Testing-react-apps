import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService({ username, password })
      setUser(user)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Wrong credentials');
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div className="username-input">
        Username
        <input
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div className="password-input">
        Password
        <input
          type="text"
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = () => {
    setUser(null)

    window.localStorage.removeItem('loggedUser')
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

  const handleNewBlog = async (e) => {
    e.preventDefault()

    blogService.create({
      title: titleInput,
      author: authorInput,
      url: urlInput
    })

    const blogs = await blogService.getAll()

    setBlogs(blogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <button onClick={ handleLogout }>logout</button>
      <h2>blogs</h2>
      <div>{ user.username } logged in</div>
      <form onSubmit={ handleNewBlog }>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App