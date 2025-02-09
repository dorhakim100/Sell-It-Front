import client from '../client'

const login = (userCred) => client.post('/auth/login', userCred)

const signup = (userCred) => client.post('/auth/signup', userCred)

const getUsers = (filter) => client.get('/user', filter)
const getById = (userId) => client.get(`/user/${userId}`)
const remove = (userId) => client.remove(`/user/${userId}`)
const update = (updatedUser, token) =>
  client.put(`/user/${updatedUser._id}`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

function getLoggedinUser() {
  return null
}

export const userService = {
  login,
  signup,
  getUsers,
  getById,
  remove,
  getLoggedinUser,
  getEmptyUser,
  update,
}

function getEmptyUser() {
  return {
    username: '',
    password: '',
    fullname: '',
    isAdmin: false,
    email: '',
    items: [],
    image: '',
  }
}
