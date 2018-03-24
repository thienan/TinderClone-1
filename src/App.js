import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { NativeRouter, Route, Switch } from 'react-router-native'

import LoginPage from './containers/LoginPage'
import DiscoverPage from './containers/DiscoverPage'

class App extends Component {
  render() {
    return (
      <Provider>
        <NativeRouter>
          <Switch>
            <Route exact path="/" component={DiscoverPage} />
            <Route path="/main" component={LoginPage} />
          </Switch>
        </NativeRouter>
      </Provider>
    )
  }
}

export default App
