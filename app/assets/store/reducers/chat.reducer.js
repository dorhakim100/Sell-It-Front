import { chatService } from '../../api/chat.js'

export const SET_CHATS = 'SET_CHATS'
export const SET_NEW_CHATS = 'SET_NEW_CHATS'
export const SET_CHAT = 'SET_CHAT'
export const SET_CHAT_FILTER = 'SET_CHAT_FILTER'
export const ADD_CHAT = 'ADD_CHAT'
export const REMOVE_CHAT = 'REMOVE_CHAT'
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'

const initialState = {
  chats: [],
  currChat: chatService.getEmptyChat(),

  filter: chatService.getDefaultFilter(),
}

export function chatReducer(state = initialState, action) {
  var newState = state
  var chats
  switch (action.type) {
    case SET_CHATS:
      newState = { ...state, chats: action.chats } // Reset chats for first page

      break
    case SET_CHAT:
      newState = { ...state, currChat: action.chatToSet }
      break
    case SET_CHAT_FILTER:
      newState = { ...state, filter: action.filterToSet }

      break
    case ADD_CHAT:
      chats = state.chats
      const { newChat } = action

      newState = {
        ...state,
        chats: [newChat, ...chats],
      }

      break
    case REMOVE_CHAT:
      const lastRemovedItem = state.chats.find(
        (chatToFind) => chatToFind._id === action.chatId
      )
      console.log(lastRemovedItem)
      console.log(state.chats)

      chats = state.chats.filter(
        (chatToFind) => chatToFind._id !== action.chatId
      )
      newState = { ...state, chats: chats, lastRemovedItem }

      break

    // // case REMOVE_MESSAGE:
    // //   chats = state.chats
    // //   const { newItem } = action

    // //   newState = {
    // //     ...state,
    // //     chats: [newItem, ...chats],
    // //   }

    // //   break
    // // case ADD_MESSAGE:
    // //   chats = state.chats
    // //   const { newItem } = action

    // //   newState = {
    // //     ...state,
    // //     chats: [newItem, ...chats],
    // //   }

    // //   break

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

  state = itemReducer(state, { type: SET_ITEMS, chats: [item1] })

  state = itemReducer(state, { type: ADD_ITEM, item: item2 })

  state = itemReducer(state, {
    type: UPDATE_ITEM,
    item: { ...item2, vendor: 'Good' },
  })

  state = itemReducer(state, { type: REMOVE_ITEM, chatId: item2._id })

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = itemReducer(state, {
    type: ADD_ITEM_MSG,
    chatId: item1._id,
    msg,
  })

  state = itemReducer(state, { type: REMOVE_ITEM, chatId: item1._id })
}
