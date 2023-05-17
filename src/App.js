import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NotificationBar from './components/NotificationBar'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [notification, setNotification] = useState('')

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
      showNotification('wrong username or password');
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

    await blogService.create({
      title: titleInput,
      author: authorInput,
      url: urlInput
    })

    const blogs = await blogService.getAll()

    setBlogs(blogs)
    showNotification(`a new blog ${titleInput} by ${authorInput} added`)
  }

  const showNotification = ( newMessage ) => {
    setNotification(newMessage)

    setTimeout(() => {
      setNotification('')
    }, 5000);
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
        <NotificationBar notification={notification} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <NotificationBar notification={notification} />
      <button onClick={ handleLogout }>logout</button>
      <h2>blogs</h2>
      <div>{ user.username } logged in</div>
      <BlogForm 
        handleNewBlog={handleNewBlog}
        handleTitle={handleTitle}
        handleAuthor={handleAuthor}
        handleUrl={handleUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App