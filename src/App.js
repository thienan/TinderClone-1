import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NativeRouter, Route, Switch } from 'react-router-native'
import SplashScreen from 'rn-splash-screen'
import {
  LOGIN_PATH,
  MATCHES_PATH,
  DISCOVER_PATH,
  ACCOUNT_PATH,
  USER_PATH
} from './constants/paths'

import LoginPage from './containers/LoginPage'
import DiscoverPage from './containers/DiscoverPage'
import MatchesPage from './containers/MatchesPage'
import AccountPage from './containers/AccountPage'
import UserPage from './containers/UserPage'

import store from './store'

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            <Route exact path={LOGIN_PATH} component={LoginPage} />
            <Route path={MATCHES_PATH} component={MatchesPage} />
            <Route path={DISCOVER_PATH} component={DiscoverPage} />
            <Route path={ACCOUNT_PATH} component={AccountPage} />
            <Route path={USER_PATH} component={UserPage} />
          </Switch>
        </NativeRouter>
      </Provider>
    )
  }
}

export default App
