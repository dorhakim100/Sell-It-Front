import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Entypo from '@expo/vector-icons/Entypo'

import ItemPreview from './ItemPreview'
import ListItemSeparator from './ListItemSeparator'
import ListItemSwipeAction from './ListItemSwipeAction'

import { loadChats } from '../store/actions/chat.actions'
import { chatService } from '../api/chat'

import colors from '../config/color'
import { useSelector } from 'react-redux'

import ChatPreview from './ChatPreview.js'

export default function ChatsList({
  chats,
  isRefreshing,
  extraKey,
  swipeable,
  deleteChat,
  setChat,
}) {
  //   console.log(chats)

  const swipeableRef = useRef(null)

  const handleSwipeableOpen = (currentRef) => {
    if (swipeableRef.current) {
      swipeableRef.current.close() // Close the previously open Swipeable if exists
    }
    swipeableRef.current = currentRef.current // Set the new Swipeable as the current one
  }

  async function onSwipePress(item, swipeableRef) {
    try {
      if (swipeableRef.current) {
        swipeableRef.current.close()
      }

      console.log(item)
      await deleteChat(item._id)
    } catch (err) {
      console.log(err)
    }
  }

  const loadMoreData = async () => {
    try {
      const pageToSet = filter.pageIdx + 1
      if (pageToSet === maxPage) return

      const newItems = await getPageIdxItems(pageToSet)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(chat) => chat._id.toString() + extraKey}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadChats(chatService.getDefaultFilter())
      }}
      onEndReached={loadMoreData} // Trigger load more data when end is reached
      // onEndReachedThreshold={0.5} // Threshold for when to trigger loadMoreData (0 to 1, where 1 is the very end)
      renderItem={({ item }) => {
        return (
          <ChatPreview
            onSwipeableOpen={(ref) => handleSwipeableOpen(ref)}
            chat={item}
            //   items={items}
            setChat={setChat}
            renderRightAction={() => (
              <ListItemSwipeAction
                onPress={() => onSwipePress(item, swipeableRef)}
                backgroundColor={swipeable.backgroundColor}
                icon={swipeable.icon}
              />
            )} // sending a function, not cmp
            //   setChat={setChat}
          />
        )
      }}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={<ListItemSeparator color={colors.softPurple} />}
    />
  )
}

const styles = StyleSheet.create({})
