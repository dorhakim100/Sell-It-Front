import { messageService } from '../../api/message.js'

export const SET_MESSAGES = 'SET_MESSAGES'
export const SET_MESSAGE = 'SET_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const SET_FILTER = 'SET_FILTER'
export const SET_NEW_MESSAGES = 'SET_NEW_MESSAGES'
export const SET_MY_MESSAGES = 'SET_MY_MESSAGES'
export const SET_MY_NEW_MESSAGES = 'SET_MY_NEW_MESSAGES'

const initialState = {
  chats: [],
  currChat: messageService.getEmptyChat(),

  filter: messageService.getDefaultFilter(),
}

export function messageReducer(state = initialState, action) {
  var newState = state
  var messages
  switch (action.type) {
    case SET_CHATS:
      newState = { ...state, chats: action.chats } // Reset messages for first page

      break
    case SET_CHAT:
      newState = { ...state, currChat: action.chatToSet }
      break
    case REMOVE_CHAT:
      const lastRemovedItem = state.chats.find(
        (itemToFind) => itemToFind._id === action.itemId
      )
      chats = state.myItems.filter(
        (itemToFind) => itemToFind._id !== action.itemId
      )
      newState = { ...state, chats: chats, lastRemovedItem }
      break

    case ADD_CHAT:
      messages = state.messages
      const { newChat } = action

      newState = {
        ...state,
        messages: [newChat, ...chats],
      }

      break
    // case REMOVE_MESSAGE:
    //   messages = state.messages
    //   const { newItem } = action

    //   newState = {
    //     ...state,
    //     messages: [newItem, ...messages],
    //   }

    //   break
    // case ADD_MESSAGE:
    //   messages = state.messages
    //   const { newItem } = action

    //   newState = {
    //     ...state,
    //     messages: [newItem, ...messages],
    //   }

    //   break

    case SET_FILTER:
      newState = { ...state, filter: action.filterToSet }

      break

    default:
      return newState
  }
  return newState
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState
  const item1 = {
    _id: 'b101',
    vendor: 'Item ' + parseInt(Math.random() * 10),
    msgs: [],
  }
  const item2 = {
    _id: 'b102',
    vendor: 'Item ' + parseInt(Math.random() * 10),
    msgs: [],
  }

  state = itemReducer(state, { type: SET_ITEMS, messages: [item1] })

  state = itemReducer(state, { type: ADD_ITEM, item: item2 })

  state = itemReducer(state, {
    type: UPDATE_ITEM,
    item: { ...item2, vendor: 'Good' },
  })

  state = itemReducer(state, { type: REMOVE_ITEM, itemId: item2._id })

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = itemReducer(state, {
    type: ADD_ITEM_MSG,
    itemId: item1._id,
    msg,
  })

  state = itemReducer(state, { type: REMOVE_ITEM, itemId: item1._id })
}
