import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService({ username, password })
      setUser(user)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Wrong credentials');
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div class="username-input">
        Username
        <input
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div class="password-input">
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App