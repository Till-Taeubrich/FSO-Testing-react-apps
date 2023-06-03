import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const replace = async blogData => {
  const replaceUrl = `${baseUrl}/${blogData.id}`

  const response = await axios.put(replaceUrl, blogData)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, replace }