import { chatService } from '../../api/chat'
import { store } from '../store'
import {
  SET_CHATS,
  SET_CHAT,
  SET_CHATS_FILTER,
  SET_NEW_CHATS,
  ADD_CHAT,
  REMOVE_CHAT,
} from '../reducers/chat.reducer'

import authStorage from '../../api/user/storage'
import { makeId } from '../../services/util.service'
import { userService } from '../../api/user/user'
import { jwtDecode } from 'jwt-decode'

export async function loadChats(filterBy) {
  try {
    const res = await chatService.query(filterBy)

    if (!res.ok) throw res

    const chats = res.data
    setChatFilter(filterBy)
    console.log(chats)

    store.dispatch({
      type: SET_CHATS,
      chats,
    })

    // store.dispatch({ type: SET_CHAT_FILTER, filter: filterBy })
    return chats
  } catch (err) {
    console.log('Cannot load chats', err)
    throw err
  }
}

export function setChatFilter(filterToSet) {
  store.dispatch({
    type: SET_CHATS_FILTER,
    filterToSet,
  })
}
export async function getPageChats(filterBy) {
  try {
    const res = await chatService.query(filterBy)

    if (!res.ok) throw res

    const chats = res.data
    console.log(chats)
    // return
    setChatFilter(filterBy)

    store.dispatch({
      type: SET_NEW_CHATS,
      newChats: chats,
    })

    return chats
  } catch (err) {
    console.log('Cannot load chats', err)
    throw err
  }
}

export async function loadChat(chatId) {
  try {
    const res = await chatService.getById(chatId)
    if (!res.ok) return res
    const chat = res.data
    store.dispatch({
      type: SET_CHAT,
      chatToSet: chat,
    })
    return res
  } catch (err) {
    // console.log('Cannot load chat', err)
    throw err
  }
}

export function removeChat(chatId) {
  try {
    store.dispatch({
      type: REMOVE_CHAT,
      chatId,
    })
  } catch (err) {
    throw err
  }
}

// export async function addNewItem(itemToAdd, onProgress) {
//   try {
//     // console.log(itemToAdd)
//     // return
//     const res = await chatService.post(itemToAdd, onProgress)
//     if (!res.ok) {
//       console.log(res)
//       return res
//     }
//     const savedItem = res.data
//     store.dispatch({
//       type: ADD_NEW_ITEM,
//       newItem: savedItem,
//     })
//     return savedItem
//   } catch (err) {
//     throw err
//   }
// }
