import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'

import Entypo from '@expo/vector-icons/Entypo'

import ItemPreview from './ItemPreview'
import ListItemSeparator from './ListItemSeparator'
import ListItemSwipeAction from './ListItemSwipeAction'

import { loadItems, loadItem } from '../store/actions/item.actions'
import { itemService } from '../services/item/item.service'

import colors from '../config/color'
import { useSelector } from 'react-redux'

function ItemList({
  items,
  setItem,
  isRefreshing,
  onSwipePress,
  swipeable,
  getPageIdxItems,
  maxPage,
  extraKey,
  refreshingFilter,
}) {
  const filter = useSelector((stateSelector) => stateSelector.itemModule.filter)

  const swipeableRef = useRef(null)

  const handleSwipeableOpen = (currentRef) => {
    if (swipeableRef.current) {
      swipeableRef.current.close() // Close the previously open Swipeable if exists
    }
    swipeableRef.current = currentRef.current // Set the new Swipeable as the current one
  }
  const route = useRoute()
  const loadMoreData = async () => {
    if (extraKey !== route.name) return
    try {
      const pageToSet = filter.pageIdx + 1
      console.log('pageToSet:', pageToSet)
      console.log('maxPage:', maxPage)

      if (pageToSet !== maxPage) {
        const newItems = await getPageIdxItems(pageToSet)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item._id.toString() + extraKey}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadItems(refreshingFilter || itemService.getDefaultFilter())
      }}
      onEndReached={async () => await loadMoreData()} // Trigger load more data when end is reached
      // onEndReachedThreshold={0.5} // Threshold for when to trigger loadMoreData (0 to 1, where 1 is the very end)
      renderItem={({ item }) => (
        <ItemPreview
          onSwipeableOpen={(ref) => handleSwipeableOpen(ref)}
          item={item}
          items={items}
          renderRightAction={() => (
            <ListItemSwipeAction
              onPress={() => onSwipePress(item, swipeableRef)}
              backgroundColor={swipeable.backgroundColor}
              icon={swipeable.icon}
            />
          )} // sending a function, not cmp
          setItem={setItem}
        />
      )}
      contentContainerStyle={styles.listContainer}
      // ItemSeparatorComponent={<ListItemSeparator color={colors.secondLight} />}
    />
  )
}

const styles = StyleSheet.create({})

export default ItemList
