
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
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
  Thumbnail,
  Spinner
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

class AccountPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const account = this.props.account
    const showLoader = !Object.keys(account).length
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Account</Title>
          </Body>
        </Header>
          {
            showLoader &&
            <Content contentContainerStyle={styles.contentContainer}>
              <Spinner color={PURPLE} />
            </Content>
          }
          {
            !showLoader &&
            <Content contentContainerStyle={styles.contentContainer}>
              <Thumbnail large source={{ uri: account.photoUrl }} />
              <Text style={styles.accountName}>{`${account.displayName}, ${account.age}`}</Text>
              <LinearGradient colors={ [PINK, PURPLE] } style={styles.gradientButton}
                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} >
                <Icon name='ios-settings' style={styles.buttonIcon} />
                <Text style={styles.buttonText} >Settings</Text>
              </LinearGradient>
            </Content>
          }
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

const mapStateToProps = (state) => ({ account: state.account })
export default connect(mapStateToProps)(AccountPage)
