import { itemService } from '../../api/item'
import { store } from '../store'
import {
  SET_ITEM,
  SET_ITEMS,
  REMOVE_ITEM,
  ADD_ITEM,
  ADD_NEW_ITEM,
  SET_FILTER,
  SET_NEW_ITEMS,
} from '../reducers/item.reducer'
import { SET_USER } from '../reducers/user.reducer'
import authStorage from '../../api/user/storage'
import { makeId } from '../../services/util.service'
import { userService } from '../../api/user/user'
import { jwtDecode } from 'jwt-decode'

export async function loadItems(filterBy) {
  try {
    console.log(filterBy)
    const res = await itemService.query(filterBy)
    console.log(res)
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

export function setItemFilter(filterToSet) {
  store.dispatch({
    type: SET_FILTER,
    filterToSet,
  })
}
export async function getPageItems(filterBy) {
  try {
    const res = await itemService.query(filterBy)

    if (!res.ok) throw res

    const items = res.data
    console.log(items)
    // return
    store.dispatch({
      type: SET_FILTER,
      filterToSet: filterBy,
    })
    store.dispatch({
      type: SET_NEW_ITEMS,
      newItems: items,
    })

    return items
  } catch (err) {
    console.log('Cannot load items', err)
    throw err
  }
}

export async function loadItem(itemId) {
  try {
    const res = await itemService.getById(itemId)
    if (!res.ok) return res
    const item = res.data
    store.dispatch({
      type: SET_ITEM,
      itemToSet: item,
    })
    return res
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

export async function addToCart(itemId) {
  try {
    console.log(itemId)
    const token = await authStorage.getToken()
    console.log(token)
    const user = jwtDecode(token)

    if (user.items.includes(itemId)) return

    if (!user) return { ok: false }
    const res = await itemService.getById(itemId)

    if (!res.ok) return res

    const item = res.data

    const originalItems = user.items

    console.log({
      ...user,
      items: [itemId, ...originalItems],
    })

    const updateRes = await userService.update(
      {
        ...user,
        items: [itemId, ...originalItems],
      },
      token
    )
    if (!updateRes.ok) return updateRes

    store.dispatch({
      type: ADD_ITEM,
      itemToAdd: item,
    })
    store.dispatch({
      type: SET_USER,
      currUser: updateRes.data,
    })

    return res
  } catch (err) {
    throw err
  }
}

export async function navItem(itemIndex) {
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
    // console.log(itemToAdd)
    // return
    const res = await itemService.post(itemToAdd, onProgress)
    if (!res.ok) {
      console.log(res)
      return res
    }
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
