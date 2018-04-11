import {
  ADD_MATCH,
  UPDATE_MATCH,
  DELETE_ALL_MATCHES
} from './actionTypes'

const initialState = []

const matches = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATCH:
      return [...state, action.payload]

    case UPDATE_MATCH:
      const match = action.payload
      return state.map( el => el.id === match.id ? match : el)

    case DELETE_ALL_MATCHES:
      return initialState

    default:
      return state
  }
}

export default matches