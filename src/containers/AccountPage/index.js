
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
  ORANGE,
  WHITE
} from '../../constants/colors'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

const account = {
    name: 'Emilia Clarke',
    age: 21,
    image: { uri: 'https://vignette.wikia.nocookie.net/starwars/images/5/52/Emilia_Clarke.png/revision/latest?cb=20161119014350' },
}

class MatchesPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Account</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <Thumbnail large source={account.image} />
          <Text style={styles.accountName}>{`${account.name}, ${account.age}`}</Text>
          <LinearGradient colors={ [PINK, PURPLE] } style={styles.gradientButton}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} >
            <Icon name='ios-settings' style={styles.buttonIcon} />
            <Text style={styles.buttonText} >Settings</Text>
          </LinearGradient>
          <LinearGradient colors={ [PINK, PURPLE] } style={styles.gradientButton}
            start={{x: 0, y: 0}} end={{x: 1, y: 1}} >
            <Icon name='md-create' style={styles.buttonIcon} />
            <Text style={styles.buttonText} >Edit Profile</Text>
          </LinearGradient>
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={() => this.props.history.push('/account')}>
              <Icon name='ios-happy-outline' style={styles.footerIconActive}/>
            </Button>
            <Button onPress={() => this.props.history.push('/discover')}>
              <Icon name='ios-swap' style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/matches')}>
              <Icon name='ios-chatbubbles-outline' style={styles.footerIcon}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default MatchesPage
