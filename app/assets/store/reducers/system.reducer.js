import { userService } from '../../services/user/user.service'

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_IS_ACCESSIBILITY = 'SET_IS_ACCESSIBILITY'
export const SET_IS_PREFS = 'SET_IS_PREFS'
export const SET_PREFS = 'SET_PREFS'
export const SET_IS_MODAL = 'SET_IS_MODAL'
export const SET_MODAL_MESSAGE = 'SET_MODAL_MESSAGE'

const initialState = {
  isLoading: false,
  // prefs: userService.getPrefs(),
  isAccessibility: false,
  isPrefs: false,
  isModal: false,
  modalMessage: { he: '', eng: '' },
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_IS_ACCESSIBILITY:
      return { ...state, isAccessibility: action.isAccessibility }
    case SET_IS_PREFS:
      return { ...state, isPrefs: action.isPrefs }
    case SET_PREFS:
      return { ...state, prefs: action.prefs }
    case SET_IS_MODAL:
      return { ...state, isModal: action.isModal }
    case SET_MODAL_MESSAGE:
      return { ...state, modalMessage: action.modalMessage }
    default:
      return state
  }
}
