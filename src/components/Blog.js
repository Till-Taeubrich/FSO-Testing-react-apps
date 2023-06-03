import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({
  blog,
  refreshBlogs
}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAllInfo, setShowAllInfo] = useState(false)

  const showWhenVisible = { display: showAllInfo ? '' : 'none' }

  const increaseLikes = async () => {

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div className="initially-hidden" style={showWhenVisible} >
        <div>
          {blog.url} 
        </div>
        <div>
          {blog.likes} <button onClick={increaseLikes}>Like</button>
        </div>
        <div>
          {blog.username} 
        </div>
      </div>
      <button onClick={() => setShowAllInfo(!showAllInfo)}>view</button>
    </div>
  )
}

export default Blog