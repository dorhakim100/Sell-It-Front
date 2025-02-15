import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { GiftedChat, Bubble } from 'react-native-gifted-chat'

import Screen from './Screen'
import { userService } from '../api/user/user'

import defaultStyles from '../config/styles'
import ProfileBanner from '../cmps/ProfileBanner'

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

  const modifyMessages = () => {
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
    const otherUser = currChat.userDetails.find(
      (userToCheck) => userToCheck._id !== user._id
    )
    setOtherUser(otherUser)
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  return (
    <Screen>
      <ProfileBanner
        user={{
          fullname: otherUser.fullname,
          image: otherUser.image,
          extra: otherUser.phone,
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={(user && user) || userService.getEmptyUser()}
        renderBubble={renderBubble}
        // containerStyle={{ backgroundColor: '#fff' }}
        messagesContainerStyle={{
          backgroundColor: defaultStyles.colors.whiteBackground,
        }}
        inputToolbarStyle={{
          backgroundColor: defaultStyles.colors.strongWhite,
        }}
      />
    </Screen>
  )
}

const renderBubble = (props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: { backgroundColor: defaultStyles.colors.strongWhite },
      right: { backgroundColor: defaultStyles.colors.primaryLight },
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
)

const styles = StyleSheet.create({})
