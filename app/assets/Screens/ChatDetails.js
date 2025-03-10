import {
  StyleSheet,
  Alert,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { GiftedChat, Bubble } from 'react-native-gifted-chat'

import * as Haptics from 'expo-haptics'

import Screen from './Screen'
import CustomText from '../cmps/CustomText'
import { userService } from '../api/user/user'

import defaultStyles from '../config/styles'
import ProfileBanner from '../cmps/ProfileBanner'
import {
  addNewMessage,
  loadChat,
  removeMessage,
  setGlobalOtherUser,
} from '../store/actions/chat.actions'

import {
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
} from '../services/socket.service'
import { socketService } from '../services/socket.service'

const screenWidth = Dimensions.get('window').width

// const expo = new Expo()

export default function ChatDetails() {
  const currChat = useSelector(
    (StateSelector) => StateSelector.chatModule.currChat
  )

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [otherUser, setOtherUser] = useState(userService.getEmptyUser())

  const [messages, setMessages] = useState([])

  useEffect(() => {
    modifyMessages()
    getOtherUser()
  }, [currChat])

  useEffect(() => {
    if (!user) return
    socketService.on(SOCKET_EVENT_ADD_MSG, async () => {
      const res = await loadChat(currChat._id)
      if (!res.ok) return
    })
  }, [])

  const modifyMessages = () => {
    if (!currChat) return
    if (!currChat.messageDetails) return setMessages([])
    const modifiedMessages = currChat.messageDetails.map((message) => {
      const user = currChat.userDetails.find(
        (user) => user._id === message.from
      )
      const modifiedUser = {
        _id: user._id,
        name: user.fullname,
        avatar: user.image,
      }
      const modifiedMessage = {
        _id: message._id,
        text: message.content,
        user: modifiedUser,
        createdAt: message.sentAt,
      }
      return modifiedMessage
    })

    setMessages(modifiedMessages.reverse())
  }

  const getOtherUser = () => {
    if (!user) return

    // return
    const otherUser = currChat.userDetails.find(
      (userToCheck) => userToCheck._id !== user._id
    )
    setOtherUser(otherUser)
    setGlobalOtherUser(otherUser)
    return otherUser
  }

  const onSend = useCallback(async (messages = []) => {
    let other

    if (!otherUser._id) {
      other = getOtherUser()
    } else {
      other = otherUser
    }

    const message = messages[0]

    const messageToSave = {
      content: message.text,
      from: message.user._id,
      to: other._id,
      sentAt: Date.now(),
      chatId: currChat._id,
    }
    const saved = await addNewMessage(messageToSave)
    socketService.emit(SOCKET_EMIT_SEND_MSG, saved)

    const messageToInsert = {
      text: saved.content,
      user: user,
      _id: saved._id,
      createdAt: messages[0].createdAt,
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [messageToInsert])
    )
  }, [])

  const onLongPress = async (context, currentMessage) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      if (currentMessage.user._id === user._id) {
        Alert.alert(
          'Delete Message',
          'Are you sure you want to delete this message?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: () => handleDeleteMessage(currentMessage._id),
            },
          ],
          { cancelable: true }
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await removeMessage(messageId, currChat._id)
      if (!res.ok) alert(`Couldn't delete message`)

      setMessages((prev) => prev.filter((message) => message._id !== messageId))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Screen>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={(user && user) || userService.getEmptyUser()}
        renderBubble={renderBubble}
        renderMessage={(props) => <CustomMessage {...props} />}
        // containerStyle={{ backgroundColor: '#fff' }}
        messagesContainerStyle={{
          backgroundColor: defaultStyles.colors.whiteBackground,
        }}
        inputToolbarStyle={{
          backgroundColor: defaultStyles.colors.strongWhite,
        }}
        onLongPress={onLongPress}
        listViewProps={{
          contentContainerStyle: { flexGrow: 1 },
          keyboardShouldPersistTaps: 'always',
          inverted: messages.length === 0 ? false : true, // try disabling inversion if it fits your UX
          scrollEnabled: true,
          contentContainerStyle: { flexGrow: 1 },
          keyboardShouldPersistTaps: 'always',
        }}
        renderChatEmpty={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <CustomText>No messages yet</CustomText>
          </View>
        )}
      />
    </Screen>
  )
}

const renderBubble = (props) => (
  <View style={styles.messageContainer}>
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: defaultStyles.colors.strongWhite,
          width: screenWidth,
        },
        right: {
          backgroundColor: defaultStyles.colors.primaryLight,
          width: screenWidth,
        },
      }}
      textStyle={{
        left: { color: defaultStyles.colors.darkGray },
        right: { color: defaultStyles.colors.darkGray },
      }}
      timeTextStyle={{
        left: { color: defaultStyles.colors.darkGray },
        right: { color: defaultStyles.colors.darkGray /*fontSize: 12*/ },
      }}
    />
  </View>
)

const CustomMessage = (props) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.messageContainer}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: defaultStyles.colors.strongWhite,
              maxWidth: '80%', // restrict bubble width for left messages
            },
            right: {
              backgroundColor: defaultStyles.colors.primaryLight,
              maxWidth: '80%', // restrict bubble width for right messages
            },
          }}
          textStyle={{
            left: { color: defaultStyles.colors.darkGray },
            right: { color: defaultStyles.colors.darkGray },
          }}
          timeTextStyle={{
            left: { color: defaultStyles.colors.darkGray },
            right: { color: defaultStyles.colors.darkGray },
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
})
