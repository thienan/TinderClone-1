
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'
import * as messagesActions from '../../components/Messages/actions'

import { StyleSheet, Image } from 'react-native'
import {
  Container,
  Header,
  Content,
  Text,
  View,
  Body,
  Title,
  Icon,
  Spinner
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  DARK_GREY,
  ORANGE,
  WHITE
} from '../../constants/colors'
import styles from './styles'

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
    this.onSend = this.onSend.bind(this)
  }

  componentWillMount() {
    this.props.messagesActions.fetchMessages(this.props.chat.id)
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }

  renderSend(props) {
    return (
      <Send {...props}>
          <View style={styles.sendContainer}>
            <Icon name='md-send' style={styles.sendIcon} />
          </View>
      </Send>
    )
  }

  renderBubble(props) {
    return (
      <Bubble {...props}
        textStyle={{ left: styles.bubbleText }}
        wrapperStyle={{
          left: styles.bubbleWrapperLeft,
          right: styles.bubbleWrapperRight
        }}
      />
    )
  }

  renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={styles.input} />
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>{this.props.chat[`title_${this.props.account.id}`]}</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            renderAvatar={null}
            renderSend={this.renderSend}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderLoading={() => <Spinner color={PURPLE} size='large' />}
            user={{ _id: 1 }}
          />
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => ({
  account: state.account,
  chat: state.matches.find(el => el.id == props.match.params.id)
})
const mapDispatchToProps = (dispatch) => ({ messagesActions: bindActionCreators(messagesActions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
