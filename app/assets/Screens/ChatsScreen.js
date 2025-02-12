import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadChats, setChatFilter } from '../store/actions/chat.actions'
import { setIsLoading } from '../store/actions/system.actions'
import { chatService } from '../api/chat'

import Screen from './Screen'
import ChatsList from '../cmps/ChatsList.js'
import CustomText from '../cmps/CustomText'

export default function ChatsScreen() {
  const chats = useSelector((stateSelector) => stateSelector.chatModule.chats)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [maxPage, setMaxPage] = useState()
  const filter = useSelector((stateSelector) => stateSelector.chatModule.filter)

  // const chats = [
  //   {
  //     _id: '12412512515',
  //     user: {
  //       id: '67aa385cdd3684f9a93896bc',
  //       fullname: 'Dor',
  //       image:
  //         'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  //     },
  //     lastMessageTime: Date.now(),
  //     messages: [
  //       {
  //         from: '67aa385cdd3684f9a93896bc',
  //         content: 'Hey',
  //         sentAt: Date.now() - 2000, // 2 seconds ago
  //       },
  //       {
  //         from: '67aa385cdd3684f9a93896bc',
  //         content: 'I want the cat',
  //         sentAt: Date.now(),
  //       },
  //     ],
  //   },
  //   {
  //     _id: '9876543210',
  //     user: {
  //       id: 'a12b34c56d78e90f12g34h56',
  //       fullname: 'Alice',
  //       image:
  //         'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  //     },
  //     lastMessageTime: Date.now(),
  //     messages: [
  //       {
  //         from: 'a12b34c56d78e90f12g34h56',
  //         content: 'Hi there!',
  //         sentAt: Date.now() - 5000, // 5 seconds ago
  //       },
  //       {
  //         from: 'a12b34c56d78e90f12g34h56',
  //         content: 'How are you?',
  //         sentAt: Date.now() - 3000, // 3 seconds ago
  //       },
  //     ],
  //   },
  //   {
  //     _id: '1122334455',
  //     user: {
  //       id: 'b23c45d67e89f01g23h45i67',
  //       fullname: 'Bob',
  //       image:
  //         'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  //     },
  //     lastMessageTime: Date.now(),
  //     messages: [
  //       {
  //         from: 'b23c45d67e89f01g23h45i67',
  //         content: 'Good morning!',
  //         sentAt: Date.now() - 10000, // 10 seconds ago
  //       },
  //       {
  //         from: 'b23c45d67e89f01g23h45i67',
  //         content: 'Have a nice day!',
  //         sentAt: Date.now() - 8000, // 8 seconds ago
  //       },
  //     ],
  //   },
  // ]

  // console.log(chats)

  // console.log(chats)
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

  return (
    <Screen>
      <CustomText style={styles.header}>Chats</CustomText>
      <ChatsList chats={chats} isRefreshing={isRefreshing} extraKey={'chat'} />
    </Screen>
  )
}
// setItem={setItem}

// onSwipePress={handleAdd}
// swipeable={swipeable}
// getPageIdxItems={getPageIdxItems}
// maxPage={maxPage}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: 700,
    padding: 10,
  },
})
