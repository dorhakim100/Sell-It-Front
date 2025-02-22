import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'

import {
  loadChat,
  loadChats,
  removeChat,
  setChatFilter,
  getPageChats,
} from '../store/actions/chat.actions'
import { setIsLoading } from '../store/actions/system.actions'
import { chatService } from '../api/chat'
import { socketService } from '../services/socket.service'
import { SOCKET_EVENT_ADD_MSG } from '../services/socket.service'

import EvilIcons from '@expo/vector-icons/EvilIcons'

import Screen from './Screen'
import ChatsList from '../cmps/ChatsList.js'
import CustomText from '../cmps/CustomText'

import defaultStyles from '../config/styles'
import routes from '../navigation/routes'
import loader from '../animation/loader/loader.json'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'

export default function ChatsScreen({ navigation }) {
  const chats = useSelector((stateSelector) => stateSelector.chatModule.chats)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [maxPage, setMaxPage] = useState()
  const filter = useSelector((stateSelector) => stateSelector.chatModule.filter)
  const isLoading = useSelector(
    (stateSelector) => stateSelector.systemModule.isLoading
  )

  const isFocused = useIsFocused()

  const swipeable = {
    backgroundColor: defaultStyles.colors.danger,
    icon: (
      <EvilIcons
        name='trash'
        size={34}
        color={defaultStyles.colors.strongWhite}
      />
    ),
  }

  const setChats = async (filter) => {
    try {
      if (!user) return
      setIsLoading(true)
      const maxPageRes = await chatService.getMaxPage(filter)
      if (!maxPageRes.ok) return
      setMaxPage(maxPageRes.data)

      const res = await loadChats(filter)

      setIsLoading(false)

      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (isFocused) setChats({ ...filter, loggedInUser: user._id })
  }, [filter, isFocused])

  useEffect(() => {
    if (!user) return setChatFilter(chatService.getDefaultFilter())
    setChats({ ...filter, loggedInUser: user._id })
  }, [user])

  useEffect(() => {
    if (!user) return
    socketService.on(SOCKET_EVENT_ADD_MSG, async () => {
      const res = await loadChats({ ...filter, loggedInUser: user._id })
      if (!res.ok) return
      const chats = res.data

      Notifications.presentNotificationAsync({
        title: 'New Message',
        body: chats[chats.length - 1].latestMessage.content,
      })
    })
  }, [])

  async function deleteChat(chatId) {
    try {
      const res = await removeChat(chatId)
      if (!res.ok) {
        Alert.alert(
          `Couldn't delete chat`, // Title of the alert
          'Do you want to try again?', // Message
          [
            {
              text: 'No', // Button text
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // Optional: styles the button as a cancel button
            },
            // { text: 'Yes', onPress: () => removeChat(imageId) },
          ]
        )
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function setChat(chatId) {
    try {
      await loadChat(chatId)
      navigateToChat()
    } catch (err) {
      console.log(err)
    }
  }

  const navigateToChat = () => {
    navigation.navigate(routes.CURR_CHAT)
  }

  const getPageIdxItems = async (pageToSet) => {
    try {
      const filterBy = { ...filter, pageIdx: pageToSet }
      return await getPageChats(filterBy)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Screen>
      <CustomText style={styles.header}>Chats</CustomText>
      <CustomLottieAnimation animation={loader} visible={isLoading} />

      {!isLoading && (
        <ChatsList
          chats={chats}
          isRefreshing={isRefreshing}
          extraKey={'chat'}
          swipeable={swipeable}
          deleteChat={deleteChat}
          setChat={setChat}
          getPageIdxItems={getPageIdxItems}
        />
      )}
    </Screen>
  )
}
// setItem={setItem}

// onSwipePress={handleAdd}

// getPageIdxItems={getPageIdxItems}
// maxPage={maxPage}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: 700,
    padding: 10,
  },
})
