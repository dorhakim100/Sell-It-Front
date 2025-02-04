import { userService } from '../../api/user/user'

export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const ADD_USER = 'ADD_USER'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
  users: [],
  currUser: userService.getLoggedinUser(),
  //   currUser: null,
  myUsers: [],
  //   filter: userService.getDefaultFilter(),
}

export function userReducer(state = initialState, action) {
  var newState = state
  var users
  switch (action.type) {
    case SET_USERS:
      newState = { ...state, users: action.users }
      break
    case SET_USER:
      newState = { ...state, currUser: action.currUser }
      break
    case REMOVE_USER:
      const lastRemovedItem = state.myUsers.find(
        (userToFind) => userToFind._id === action.userId
      )
      users = state.myUsers.filter(
        (userToFind) => userToFind._id !== action.userId
      )
      newState = { ...state, myUsers: users, lastRemovedItem }
      break
    case ADD_USER:
      users = state.myUsers
      const { userToAdd } = action
      if (users.find((userToCheck) => userToCheck._id === userToAdd._id))
        return newState

      newState = { ...state, myUsers: [userToAdd, ...users] }

      break

    case SET_FILTER:
      newState = { ...state, filter: action.filterToSet }

      break

    default:
      return newState
  }
  return newState
}
