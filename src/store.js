import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import account from './components/Account/reducer'
import matches from './components/Matches/reducer'
import messages from './components/Messages/reducer'

const rootReducer = combineReducers({ account, matches, messages })
const middleware = [logger, thunk]

export default createStore(rootReducer, applyMiddleware(...middleware))
