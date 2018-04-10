import firebase from '../../utils/firebase'

import {
  ADD_MATCH,
  UPDATE_MATCH,
  DELETE_MATCH
} from './actionTypes'

export const fetchMatches = (account_id) => {
  return (dispatch) => {
    const matchesRef = firebase.database().ref().child('matches')
                               .orderByChild(`member_${account_id}`)
                               .equalTo(true)
    return matchesRef.on('child_added', (snap) => {
      dispatch(addMatch({ id: snap.key, ...snap.val() }))
    })
  }
}

export const addMatch = (match) => ({ type: ADD_MATCH, payload: match })
export const updateMatch = (match) => ({ type: UPDATE_MATCH, payload: match })
export const deleteMatch = (match_id) => ({ type: DELETE_MATCH, payload: { match_id } })