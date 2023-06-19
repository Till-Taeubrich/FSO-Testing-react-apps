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
  const [notification, setNotification] = useState('')

  const getBlogs = async () => {
    return await blogService.getAll()
  }

  const refreshBlogs = async () => {
    const blogData = await getBlogs()
    const sortedBlogs = blogData.sort((blogOne, blogTwo) => {
      return blogOne.likes < blogTwo.likes
    })

    setBlogs( sortedBlogs )
  }

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
      showNotification('wrong username or password')
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

  const showNotification = ( newMessage ) => {
    setNotification(newMessage)

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const increaseLikes = async (blog) => {

    const blogData = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    await blogService.replace(blogData)
    refreshBlogs()
  }


  useEffect(() => {
    refreshBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
        setBlogs={setBlogs}
        showNotification={showNotification}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} increaseLikes={() => increaseLikes(blog)} />
      )}
    </div>
  )
}

export default App