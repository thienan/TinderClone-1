
import React, { Component } from 'react'
import FacebookAuth from '../../utils/FacebookAuth'
import firebase from '../../utils/firebase'

import { Container, Header, Content, Button, Text, View, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import {
  PINK,
  LIGHT_PINK,
  PURPLE,
  WHITE
} from '../../constants/colors'
import styles from './styles'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.handleFbLogin = this.handleFbLogin.bind(this)
  }

  handleFbLogin() {
    FacebookAuth.login(['public_profile', 'email']).then((data) => {
      const token = data.credentials.token
      const firebaseCredentials = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(firebaseCredentials)
        .then((data) => {
          if (data.additionalUserInfo.isNewUser) {
            const userInfo = data.user
            const profile = data.additionalUserInfo.profile
            const newUser = { gender: profile.gender,
                              age: profile.age_range.min,
                              email: userInfo.email,
                              displayName: userInfo.displayName,
                              photoUrl: userInfo.photoURL }
            firebase.database().ref(`users/${userInfo.uid}`).set(newUser)
          }
          this.props.history.push('/account')
        })
    })
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={PINK}></Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <LinearGradient
            colors={[PINK, PURPLE]}
            style={styles.gradientView}>
            <View style={styles.swiperWrapper}>
              <Swiper dotColor={LIGHT_PINK} activeDotColor={WHITE} showsButtons={false}>
                <View style={styles.slide}>
                  <Text style={styles.slideText}>Discover interesting people around you</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.slideText}>Swipe right to like</Text>
                  <Text style={styles.slideText}>Swipe left to pass</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.slideText}>If they swipe right, it's a match</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.slideText}>Converse with your match around you</Text>
                </View>
              </Swiper>
            </View>
            <View style={styles.buttonWrapper}>
              <Button iconLeft light style={styles.button} onPress={this.handleFbLogin}>
                <Icon name='logo-facebook' />
                <Text style={styles.buttonText}>Sign in with facebook</Text>
              </Button>
            </View>
            
          </LinearGradient>
        </Content>
      </Container>
    )
  }
}

export default LoginPage
