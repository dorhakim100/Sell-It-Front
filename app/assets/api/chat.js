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

const getById = (itemId, filter = getDefaultFilter()) =>
  client.get(`${endpoint}/${itemId}`, filter)

export const chatService = {
  query,
  getDefaultFilter,
  post,
  getMaxPage,
  getEmptyChat,
  getById,
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
