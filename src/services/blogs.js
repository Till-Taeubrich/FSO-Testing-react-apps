import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `Bearer ${newToken}`
  setConfig()
}

const setConfig = () => {
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const replace = async blogData => {
  const replaceUrl = `${baseUrl}/${blogData.id}`

  const response = await axios.put(replaceUrl, blogData)
  return response.data
}

const remove = async blogId => {
  const removeUrl = `${baseUrl}/${blogId}`

  const response = await axios.delete(removeUrl, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, replace, remove }