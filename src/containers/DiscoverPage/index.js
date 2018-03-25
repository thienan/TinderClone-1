
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

class DiscoverPage extends Component {
  constructor(props) {
    super(props)
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
          <View>
            <DeckSwiper
              dataSource={cards}
              renderItem={item =>
                <View>
                  <CardItem style={styles.cardImageItem} cardBody>
                    <Image style={styles.cardImage} source={item.image} />
                  </CardItem>
                  <CardItem style={styles.cardTextItem}>
                    <Text style={styles.cardText}>{`${item.name}, ${item.age}`}</Text>
                  </CardItem>
                </View>
              }
            />
          </View>
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

export default DiscoverPage
