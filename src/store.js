import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import account from './components/Account/reducer'

const rootReducer = combineReducers({ account })
const middleware = [logger, thunk]

export default createStore(rootReducer, applyMiddleware(...middleware))
