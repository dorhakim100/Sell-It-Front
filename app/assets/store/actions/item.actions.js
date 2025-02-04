import { itemService } from '../../api/item'
import { store } from '../store'
import {
  SET_ITEM,
  SET_ITEMS,
  REMOVE_ITEM,
  ADD_ITEM,
  ADD_NEW_ITEM,
  SET_FILTER,
} from '../reducers/item.reducer'
import { makeId } from '../../services/util.service'

export async function loadItems(filterBy) {
  try {
    const res = await itemService.query(filterBy)

    if (!res.ok) throw res

    const items = res.data
    store.dispatch({
      type: SET_FILTER,
      filterToSet: filterBy,
    })
    store.dispatch({
      type: SET_ITEMS,
      items,
    })
    // store.dispatch({ type: SET_ITEM_FILTER, filter: filterBy })
    return items
  } catch (err) {
    console.log('Cannot load items', err)
    throw err
  }
}

export async function loadItem(itemId) {
  const res = await itemService.query(itemService.getDefaultFilter())
  if (!res.ok) throw res
  const items = res.data

  const item = items.find((mon) => mon._id === itemId)
  try {
    store.dispatch({
      type: SET_ITEM,
      currItem: item,
    })
    return item
  } catch (err) {
    // console.log('Cannot load item', err)
    throw err
  }
}

export function loadMyItems() {
  try {
  } catch (err) {
    throw err
  }
}

export async function addItem(itemId) {
  try {
    const res = await itemService.query(itemService.getDefaultFilter())
    const items = res.data

    const itemToAdd = items.find((item) => item._id === itemId)

    store.dispatch({
      type: ADD_ITEM,
      itemToAdd,
    })
  } catch (err) {
    throw err
  }
}

export async function navItem(itemIndex) {
  console.log(itemIndex)
  const res = await itemService.query(itemService.getDefaultFilter())
  if (!res.ok) throw res
  const items = res.data
  const item = items[itemIndex]
  try {
    store.dispatch({
      type: SET_ITEM,
      currItem: item,
    })
    return item
  } catch (err) {
    // console.log('Cannot load item', err)
    throw err
  }
}

export async function addNewItem(itemToAdd, onProgress) {
  try {
    const res = await itemService.post(itemToAdd, onProgress)
    const savedItem = res.data
    store.dispatch({
      type: ADD_NEW_ITEM,
      newItem: savedItem,
    })
    return savedItem
  } catch (err) {
    throw err
  }
}

export function removeItem(itemId) {
  try {
    store.dispatch({
      type: REMOVE_ITEM,
      itemId,
    })
  } catch (err) {
    throw err
  }
}
