import client from './client'

import axios from 'axios'

const endpoint = '/item'
import { makeId } from '../services/util.service'

const query = (filter) => client.get(endpoint, filter)

const post = (itemToAdd, onProgress) => {
  delete itemToAdd._id
  const data = new FormData()

  console.log(itemToAdd)

  data.append('num', itemToAdd.num)
  data.append('name', itemToAdd.name)
  data.append('entry', itemToAdd.entry)
  data.append('category', itemToAdd.category)

  itemToAdd.types.forEach((type, index) => data.append('types', type))

  for (const imageType in itemToAdd.sprites) {
    data.append(`sprites[${imageType}]`, itemToAdd.sprites[imageType])
    // data.append(`sprites[${imageType}]`, {
    //   name: makeId(),
    //   type: 'image/jpeg',
    //   uri: itemToAdd.sprites[imageType],
    // })
  }

  return client.post(`${endpoint}`, data, {
    onUploadProgress: (progress) =>
      onProgress(progress.loaded / progress.total),
  })
}

export const itemService = {
  query,
  getDefaultFilter,
  post,
  getMaxPage,
}

function getDefaultFilter() {
  return {
    txt: '',
    categories: [],
    pageIdx: 0,
  }
}

async function getMaxPage(filter) {
  const res = client.get(`${endpoint}/maxPage`, filter)
  if (!res.ok) return res

  return res.data
}
