
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'

import { StyleSheet, Image } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Text,
  View,
  Footer,
  FooterTab,
  Icon,
  DeckSwiper,
  Card,
  CardItem,
} from 'native-base'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  ORANGE
} from '../../constants/colors'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

const gendersMap = {
  male: 'female',
  female: 'male'
}

class DiscoverPage extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [] }
    this.swipeRight = this.swipeRight.bind(this)
    this.swipeLeft = this.swipeLeft.bind(this)
    this.renderCard = this.renderCard.bind(this)
  }

  componentDidMount() {
    const account = this.props.account
    const usersRef = firebase.database().ref(gendersMap[account.gender])
                              .orderByChild(`show_${account.id}`)
                              .equalTo(true)
    usersRef.on('child_added', (data) => {
      const users = this.state.users
      users.push({ ...data.val(), id: data.key })
      this.setState({ users })
    })
  }

  swipeRight(user) {
    const account = this.props.account
    const updates = {}
    updates[`users/${user.id}/show_${account.id}`] = false
    updates[`users/${user.id}/liked_${account.id}`] = true
    if (account[`liked_${user.id}`]) {
      const key = firebase.database().ref().child('matches').push().key
      updates[`matches/${key}/member_${account.id}`] = true
      updates[`matches/${key}/member_${user.id}`] = true
      updates[`matches/${key}/title_${account.id}`] = user.displayName
      updates[`matches/${key}/title_${user.id}`] = account.displayName
      updates[`matches/${key}/photo_${account.id}`] = user.photoUrl
      updates[`matches/${key}/photo_${user.id}`] = account.photoUrl 
    }
    firebase.database().ref().update(updates)
  }

  swipeLeft(user) {
    const account = this.props.account
    const updates = {}
    updates[`users/${user.id}/show_${account.id}`] = false
    updates[`users/${account.id}/show_${user.id}`] = false
    firebase.database().ref().update(updates)
  }

  renderCard(item) {
    return (
      <View>
        <CardItem style={styles.cardImageItem} cardBody>
          <Image style={styles.cardImage} source={{ uri: item.photoUrl }} />
        </CardItem>
        <CardItem style={styles.cardTextItem}>
          <Text style={styles.cardText}>{`${item.displayName}, ${item.age}`}</Text>
        </CardItem>
      </View>
    )
  }

  renderDeskSwiper() {
    if (this.state.users.length > 0) {
      return (
        <DeckSwiper
          dataSource={this.state.users}
          looping = {false}
          renderItem={this.renderCard}
          onSwipeRight={this.swipeRight}
          onSwipeLeft={this.swipeLeft}
        />
      )
    }
    return false
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Discover</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <View>{this.renderDeskSwiper()}</View>
          <View style={styles.actionsWrapper}>
            <LinearGradient colors={[DARK_PINK, ORANGE]} style={styles.action}>
              <Icon name="md-close" style={styles.actionIcon} />
            </LinearGradient>
            <LinearGradient colors={[PINK, PURPLE]} style={styles.action}>
              <Icon name="md-heart" style={styles.actionIcon} />
            </LinearGradient>
          </View>
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={() => this.props.history.push('/account')}>
              <Icon name="ios-happy-outline" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/discover')}>
              <Icon name="ios-swap" style={styles.footerIconActive}/>
            </Button>
            <Button onPress={() => this.props.history.push('/matches')}>
              <Icon name="ios-chatbubbles-outline" style={styles.footerIcon}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ account: state.account })
export default connect(mapStateToProps)(DiscoverPage)
