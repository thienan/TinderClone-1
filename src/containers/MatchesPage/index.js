
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
  List,
  ListItem,
  Thumbnail
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  ORANGE
} from '../../constants/colors'
import styles from './styles'

const cards = [
  {
    name: 'Emilia Clarke',
    age: 21,
    image: {uri: 'https://vignette.wikia.nocookie.net/starwars/images/5/52/Emilia_Clarke.png/revision/latest?cb=20161119014350'},
  },
  {
    name: 'Emma Watson',
    age: 25,
    image: {uri: 'https://media2.s-nbcnews.com/i/newscms/2018_01/1308579/emma-watson-today-180105-tease_f3ca373df8f31d68e977fe207aa4a80e.jpg'}
  },
  {
    name: 'Scarlett Johansson',
    age: 29,
    image: {uri: 'http://hot97svg.com/wp-content/uploads/2018/01/Scarlett-Johansson-2014-1170x658.jpg'}
  }
]

class MatchesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const account = this.props.account
    const gendersMap = {
      male: 'female',
      female: 'male'
    }
    const preferedGender = gendersMap[account.gender]
    const usersRef = firebase.database().ref()
                                      .child(preferedGender)
                                      .orderByChild(`hideFor/${account.id}`)
                                      .equalTo(null)
    usersRef.on('child_added', (data) => {
      const users = this.state.users
      users.push(data.val())
      this.setState({ users })
    })
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Matches</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.state.users} renderRow={(item) =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: item.photoUrl }} />
                </Left>
                <Body>
                  <Text style={styles.matchName}>{item.displayName}</Text>
                  <Text note style={styles.matchText}>Doing what you like will always keep you happy ...</Text>
                </Body>
                <Right style={styles.viewButtonContainer}>
                  <Text style={styles.matchText}>View</Text>
                </Right>
              </ListItem>
            }
          />
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={() => this.props.history.push('/account')}>
              <Icon name="ios-happy-outline" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/discover')}>
              <Icon name="ios-swap" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/matches')}>
              <Icon name="ios-chatbubbles-outline" style={styles.footerIconActive}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ account: state.account })
export default connect(mapStateToProps)(MatchesPage)
