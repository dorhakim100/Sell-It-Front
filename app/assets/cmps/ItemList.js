import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Entypo from '@expo/vector-icons/Entypo'

import ItemPreview from './ItemPreview'
import ListItemSeparator from './ListItemSeparator'
import ListItemSwipeAction from './ListItemSwipeAction'

import { loadItems, loadItem } from '../store/actions/item.actions'
import { itemService } from '../services/item/item.service'

import colors from '../config/color'
import { useSelector } from 'react-redux'

function ItemList({ items, setItem, isRefreshing, onSwipePress, swipeable }) {
  const swipeableRef = useRef(null)

  const handleSwipeableOpen = (currentRef) => {
    if (swipeableRef.current) {
      swipeableRef.current.close() // Close the previously open Swipeable if exists
    }
    swipeableRef.current = currentRef.current // Set the new Swipeable as the current one
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item._id.toString()}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadItems(itemService.getDefaultFilter())
      }}
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
      ItemSeparatorComponent={<ListItemSeparator color={colors.secondLight} />}
    />
  )
}

const styles = StyleSheet.create({})

export default ItemList
