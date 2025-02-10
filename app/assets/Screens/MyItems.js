import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  removeItem,
  loadItem,
  loadItems,
  setItemFilter,
  getPageItems,
} from '../store/actions/item.actions'

import Screen from './Screen'
import ItemList from '../cmps/ItemList'

import EvilIcons from '@expo/vector-icons/EvilIcons'

import colors from '../config/color'
import { itemService } from '../services/item/item.service'
import CustomText from '../cmps/CustomText'

import paths from '../navigation/routes'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'

import post from '../animation/post/post.json'

function MyItems({ navigation }) {
  const myItems = useSelector((stateSelector) => stateSelector.itemModule.items)

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const filter = useSelector((stateSelector) => stateSelector.itemModule.filter)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [maxPage, setMaxPage] = useState()

  const swipeable = {
    backgroundColor: colors.danger,
    icon: <EvilIcons name='trash' size={34} color={colors.strongWhite} />,
  }

  useEffect(() => {
    setItemFilter({ ...itemService.getDefaultFilter(), soldBy: user._id })
    // reseting filter
  }, [])

  useEffect(() => {
    setItems()
  }, [user])

  const setItem = async (itemId) => {
    await loadItems(itemService.getDefaultFilter())
    loadItem(itemId)

    navigation.navigate(paths.MAIN, { screen: paths.DETAILS })
  }

  const setItems = async () => {
    if (!user) return
    try {
      const res = await loadItems({ ...filter, soldBy: user._id })
      if (!res.ok) return
      const maxPageRes = await itemService.getMaxPage({
        ...filter,
        soldBy: user._id,
      })
      if (!maxPageRes.ok) return
      setMaxPage(maxPageRes.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = (item, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const itemId = item._id
    removeItem(itemId)
  }

  const getPageIdxItems = async (pageToSet) => {
    try {
      const filterBy = { ...filter, pageIdx: pageToSet }
      return await getPageItems(filterBy)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Screen hasNavigationBar={true}>
      {(myItems.length === 0 && (
        <>
          <CustomText style={styles.emptyList}>
            Post new Item first...
          </CustomText>
          <CustomLottieAnimation animation={post} visible={true} />
        </>
      )) || (
        <ItemList
          items={myItems}
          isRefreshing={isRefreshing}
          onSwipePress={handleDelete}
          swipeable={swipeable}
          setItem={setItem}
          getPageIdxItems={getPageIdxItems}
          extraKey={'myItems'}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  emptyList: {
    // flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 30,
  },
})

export default MyItems
