import client from './client'

import axios from 'axios'

const endpoint = '/message'
import { makeId } from '../services/util.service'

const query = (filter) => client.get(endpoint, filter)

const post = (message) => {
  return client.post(`${endpoint}`, message)
}

const getById = (itemId, filter = getDefaultFilter()) =>
  client.get(`${endpoint}/${itemId}`, filter)

export const messageService = {
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
