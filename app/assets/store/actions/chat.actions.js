import { chatService } from '../../api/chat'
import { store } from '../store'
import {
  SET_CHATS,
  SET_CHAT,
  SET_NEW_CHATS,
  ADD_CHAT,
  ADD_NEW_MESSAGE,
  REMOVE_CHAT,
  SET_CHAT_FILTER,
} from '../reducers/chat.reducer'

import authStorage from '../../api/user/storage'
import { makeId } from '../../services/util.service'
import { userService } from '../../api/user/user'
import { jwtDecode } from 'jwt-decode'

export async function loadChats(filterBy) {
  try {
    console.log(filterBy)
    if (!filterBy.loggedInUser) {
      const token = await authStorage.getToken()
      if (!token) {
        store.dispatch({
          type: SET_CHATS,
          chats: [],
        })

        return
      }
      const user = jwtDecode(token)
      filterBy.loggedInUser = user._id
    }

    store.dispatch({ type: SET_CHAT_FILTER, filter: filterBy })
    const res = await chatService.query(filterBy)

    if (!res.ok) throw res

    const chats = res.data
    // setChatFilter(filterBy)
    console.log(chats)

    store.dispatch({
      type: SET_CHATS,
      chats,
    })

    return chats
  } catch (err) {
    console.log('Cannot load chats', err)
    throw err
  }
}

export function setChatFilter(filterToSet) {
  store.dispatch({
    type: SET_CHAT_FILTER,
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
    const token = await authStorage.getToken()
    if (!token) return { ok: false }
    const res = await chatService.getChatById(chatId, token)

    if (!res.ok) return res
    const chat = res.data
    console.log(chat)
    store.dispatch({
      type: SET_CHAT,
      chatToSet: chat,
    })
    return res
  } catch (err) {
    console.log('Cannot load chat', err)
    throw err
  }
}

export async function removeChat(chatId) {
  try {
    const token = await authStorage.getToken()

    const res = await chatService.remove(chatId, token)
    if (!res.ok) return res
    store.dispatch({
      type: REMOVE_CHAT,
      chatId,
    })
    return res //sending the res either way
  } catch (err) {
    throw err
  }
}

export async function addNewMessage(messageToAdd) {
  try {
    const users = { from: messageToAdd.from, to: messageToAdd.to }

    const isChatRes = await chatService.checkIsChat(users)
    if (!isChatRes.ok) return isChatRes

    const token = await authStorage.getToken()
    if (!token) {
      return { ok: false }
    }

    if (!isChatRes.data) {
    } else {
      // messageToAdd.isMessage = true
    }
    console.log(messageToAdd)
    const res = await chatService.post(messageToAdd, token)
    if (!res.ok) {
      console.log(res)
      return res
    }
    console.log(res)
    return
    const savedMessage = res.data
    store.dispatch({
      type: ADD_NEW_MESSAGE,
      newMessage: savedMessage,
    })
    return savedMessage
  } catch (err) {
    throw err
  }
}
