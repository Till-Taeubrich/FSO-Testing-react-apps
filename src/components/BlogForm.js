const BlogForm = ({
  handleNewBlog,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return(
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
  )
}

export default BlogForm