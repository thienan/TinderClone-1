import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { NativeRouter, Route, Switch } from 'react-router-native'

import LoginPage from './containers/LoginPage'
import DiscoverPage from './containers/DiscoverPage'
import MatchesPage from './containers/MatchesPage'
import AccountPage from './containers/AccountPage'

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path='/' component={AccountPage} />
          <Route path='/matches' component={MatchesPage} />
          <Route path='/discover' component={DiscoverPage} />
          <Route path='/account' component={AccountPage} />
        </Switch>
      </NativeRouter>
    )
  }
}

export default App
