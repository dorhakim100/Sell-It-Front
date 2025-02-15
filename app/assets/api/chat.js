import client from './client'

import axios from 'axios'

const endpoint = '/chat'
import { makeId } from '../services/util.service'

const query = (filter, token) =>
  client.get(endpoint, filter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const post = (chat, token) => {
  return client.post(`${endpoint}`, chat, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
const remove = (chatId, token) => {
  console.log(chatId)
  console.log(token)

  return client.remove(`${endpoint}/${chatId}`, {
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

function getChatById(chatId, token) {
  return client.get(
    `${endpoint}/${chatId}`,
    { chatId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

function getDefaultFilter() {
  return {
    txt: '',
    chatsIds: [],
    loggedInUser: '',
    pageIdx: 0,
  }
}

function getEmptyChat() {
  return {
    user: '',
    lastMessageTime: Date.now(),
    messages: [
      {
        from: '',
        content: '',
        sentAt: Date.now() - 2,
      },
      {
        from: '',
        content: '',
        sentAt: Date.now(),
      },
    ],
  }
}

async function getMaxPage(filter) {
  const res = client.get(`${endpoint}/maxPage`, filter)
  if (!res.ok) return res

  return res.data
}
export const chatService = {
  query,
  getDefaultFilter,
  post,
  getMaxPage,
  getEmptyChat,
  getChatById,
  remove,
}
