
import React, { Component } from 'react'
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

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  ORANGE
} from '../../constants/colors'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

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
          <List dataArray={cards} renderRow={(item) =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={item.image} />
                </Left>
                <Body>
                  <Text style={styles.matchName}>{item.name}</Text>
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

export default MatchesPage
