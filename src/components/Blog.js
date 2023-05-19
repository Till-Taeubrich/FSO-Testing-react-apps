import { useState } from "react"

const Blog = ({
  blog
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
          {blog.likes} 
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