import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  loadChats,
  removeChat,
  setChatFilter,
} from '../store/actions/chat.actions'
import { setIsLoading } from '../store/actions/system.actions'
import { chatService } from '../api/chat'

import EvilIcons from '@expo/vector-icons/EvilIcons'

import Screen from './Screen'
import ChatsList from '../cmps/ChatsList.js'
import CustomText from '../cmps/CustomText'

import defaultStyles from '../config/styles'

export default function ChatsScreen() {
  const chats = useSelector((stateSelector) => stateSelector.chatModule.chats)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [maxPage, setMaxPage] = useState()
  const filter = useSelector((stateSelector) => stateSelector.chatModule.filter)

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
      const res = await loadChats(filter)
      console.log(res)
      const maxPageRes = await chatService.getMaxPage(filter)
      setMaxPage(maxPageRes.data)
      setIsLoading(false)
      console.log(res.data)
      if (res.problem) {
        setError(true)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log(filter)
    setChats(filter)
  }, [filter])
  useEffect(() => {
    if (!user) return setChatFilter(chatService.getDefaultFilter())
    setChats({ ...filter, loggedInUser: user._id })
  }, [user])

  async function deleteChat(chatId) {
    try {
      const res = await removeChat(chatId)
      // if (!res.ok)
      //   Alert.alert(
      //     `Couldn't delete chat`, // Title of the alert
      //     'Do you want to try again?', // Message
      //     [
      //       {
      //         text: 'No', // Button text
      //         onPress: () => console.log('Cancel Pressed'),
      //         style: 'cancel', // Optional: styles the button as a cancel button
      //       },
      //       // { text: 'Yes', onPress: () => removeChat(imageId) },
      //     ]
      //   )
      // Alert.alert(
      //   `Chat deleted`, // Title of the alert
      //   [
      //     {
      //       text: 'Ok', // Button text
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel', // Optional: styles the button as a cancel button
      //     },
      //   ]
      // )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Screen>
      <CustomText style={styles.header}>Chats</CustomText>
      <ChatsList
        chats={chats}
        isRefreshing={isRefreshing}
        extraKey={'chat'}
        swipeable={swipeable}
        deleteChat={deleteChat}
      />
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
