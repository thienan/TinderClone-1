import firebase from '../../utils/firebase'

import {
  ADD_MESSAGE,
  DELETE_ALL_MESSAGES
} from './actionTypes'

export const fetchMessages = (match_id) => {
  return (dispatch) => {
    const messagesRef = firebase.database().ref(`messages/${match_id}`)
                               .orderByChild('timestamp')
    return messagesRef.on('child_added', (snap) => {
      dispatch(addMessage({ id: snap.key, ...snap.val() }))
    })
  }
}

export const addMessage = (match) => ({ type: ADD_MESSAGE, payload: match })
export const deleteAllMessages = () => ({ type: DELETE_ALL_MESSAGES, payload: {} })