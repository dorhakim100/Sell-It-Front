import { itemService } from '../../services/item/item.service'

export const SET_ITEMS = 'SET_ITEMS'
export const SET_ITEM = 'SET_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM'
export const SET_ITEMS_FILTER = 'SET_ITEMS_FILTER'
export const SET_NEW_ITEMS = 'SET_NEW_ITEMS'
export const SET_MY_ITEMS = 'SET_MY_ITEMS'
export const SET_MY_NEW_ITEMS = 'SET_MY_NEW_ITEMS'

const initialState = {
  items: [],
  currItem: itemService.getEmptyItem(),
  myItems: [],
  filter: itemService.getDefaultFilter(),
}

export function itemReducer(state = initialState, action) {
  var newState = state
  var items
  switch (action.type) {
    case SET_ITEMS:
      newState = { ...state, items: action.items } // Reset items for first page

      break
    case SET_MY_ITEMS:
      newState = { ...state, myItems: action.items } // Reset items for first page

      break
    case SET_NEW_ITEMS:
      newState = { ...state, items: [...state.items, ...action.newItems] } // Reset items for first page
      break
    case SET_MY_NEW_ITEMS:
      newState = { ...state, myItems: [...state.myItems, ...action.newItems] } // Reset items for first page

      break
    case SET_ITEM:
      newState = { ...state, currItem: action.itemToSet }
      break
    case REMOVE_ITEM:
      const lastRemovedItem = state.myItems.find(
        (itemToFind) => itemToFind._id === action.itemId
      )
      items = state.myItems.filter(
        (itemToFind) => itemToFind._id !== action.itemId
      )
      newState = { ...state, myItems: items, lastRemovedItem }
      break
    case ADD_ITEM:
      items = state.myItems
      const { itemToAdd } = action
      if (items.find((itemToCheck) => itemToCheck._id === itemToAdd._id))
        return newState

      newState = {
        ...state,
        myItems: [itemToAdd, ...items],
      }

      break
    case ADD_NEW_ITEM:
      items = state.items
      const { newItem } = action

      newState = {
        ...state,
        items: [newItem, ...items],
      }

      break

    case SET_ITEMS_FILTER:
      newState = { ...state, filter: action.filterToSet }

      break

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

  state = itemReducer(state, { type: SET_ITEMS, items: [item1] })

  state = itemReducer(state, { type: ADD_ITEM, item: item2 })

  state = itemReducer(state, {
    type: UPDATE_ITEM,
    item: { ...item2, vendor: 'Good' },
  })

  state = itemReducer(state, { type: REMOVE_ITEM, itemId: item2._id })

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = itemReducer(state, {
    type: ADD_ITEM_MSG,
    itemId: item1._id,
    msg,
  })

  state = itemReducer(state, { type: REMOVE_ITEM, itemId: item1._id })
}
