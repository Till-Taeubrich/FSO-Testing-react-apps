import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({
  blog,
  user,
  increaseLikes
}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAllInfo, setShowAllInfo] = useState(false)

  const showWhenVisible = { display: showAllInfo ? 'block' : 'none' }


  const setDeleteBtnVisibily = () => {
    if (showAllInfo && blog.user.id === user.userId) {
      return true
    }
  }

  const deleteBlog = () => {
    if(window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <span className='blog-title'>{ blog.title }</span> <span className='blog-author'>{ blog.author }</span>
      </div>
      <div className="url-likes-container" style={showWhenVisible} >
        <div className='blog-url'>
          {blog.url}
        </div>
        <div className='blog-likes'>
          {blog.likes} <button className='like-btn' onClick={increaseLikes}>Like</button>
        </div>
        <div>
          {blog.username}
        </div>
      </div>
      <button className='info-toggle-btn' onClick={() => setShowAllInfo(!showAllInfo)}>{showAllInfo ? 'close' : 'view'}</button>
      {setDeleteBtnVisibily() ? <button className='remove-btn' onClick={() => deleteBlog()}>remove</button> : null}
    </div>
  )
}

export default Blog