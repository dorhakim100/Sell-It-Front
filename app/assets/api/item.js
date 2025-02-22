import client from './client'

import axios from 'axios'

const endpoint = '/item'
import { makeId } from '../services/util.service'

const query = (filter) => client.get(endpoint, filter)

const post = (itemToAdd, onProgress) => {
  // delete itemToAdd._id
  const data = new FormData()

  data.append('label', itemToAdd.label)
  data.append('price', itemToAdd.price)
  data.append('description', itemToAdd.description)

  itemToAdd.categories.forEach((category, index) =>
    data.append('categories', category)
  )

  const stringifyArray = JSON.stringify(itemToAdd.images)

  data.append('images', stringifyArray)

  for (const property in itemToAdd.sellingUser) {
    data.append(`sellingUser[${property}]`, itemToAdd.sellingUser[property])
  }
  for (const property in itemToAdd.location) {
    data.append(`location[${property}]`, itemToAdd.location[property])
  }

  return client.post(`${endpoint}`, data, {
    onUploadProgress: (progress) =>
      onProgress(progress.loaded / progress.total),
  })
}

const getById = (itemId, filter = getDefaultFilter()) =>
  client.get(`${endpoint}/${itemId}`, filter)

export const itemService = {
  query,
  getDefaultFilter,
  post,
  getMaxPage,
  getEmptyItem,
  getById,
}

function getDefaultFilter() {
  return {
    txt: '',
    categories: [],
    pageIdx: 0,
    soldBy: '',
  }
}

function getEmptyItem() {
  return {
    _id: '679b7b4f1d197b22a0ae6f00',
    label: '',
    price: '',
    categories: [],
    description: '',
    images: [],
  }
}

async function getMaxPage(filter) {
  const res = client.get(`${endpoint}/maxPage`, filter)
  if (!res.ok) return res

  return res.data
}
