import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { useRoute } from '@react-navigation/native'

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
import { itemService } from '../api/item'
import CustomText from '../cmps/CustomText'

import paths from '../navigation/routes'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'

import post from '../animation/post/post.json'
import routes from '../navigation/routes'

function MyItems({ navigation }) {
  const myItems = useSelector((stateSelector) => stateSelector.itemModule.items)

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const filter = useSelector((stateSelector) => stateSelector.itemModule.filter)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [maxPage, setMaxPage] = useState(1)
  // const [userFilter, setUserFilter] = useState(itemService.getDefaultFilter())
  const route = useRoute()
  console.log(route)
  const swipeable = {
    backgroundColor: colors.danger,
    icon: <EvilIcons name='trash' size={34} color={colors.strongWhite} />,
  }

  useEffect(() => {
    // setUserFilter({ ...itemService.getDefaultFilter(), soldBy: user._id })
    // setItemFilter({ ...itemService.getDefaultFilter(), soldBy: user._id })
    // reseting filter
  }, [user])

  useEffect(() => {
    setItems({ ...itemService.getDefaultFilter(), soldBy: user._id })
  }, [user])

  const setItem = async (itemId) => {
    // await loadItems(itemService.getDefaultFilter())
    loadItem(itemId)

    navigation.navigate(paths.MAIN, { screen: paths.DETAILS })
  }

  const setItems = async (filterBy) => {
    if (!user) return

    try {
      // const filterBy = {
      //   ...itemService.getDefaultFilter(),
      //   soldBy: user._id,
      // }
      // return
      const res = await loadItems(filterBy)

      if (!res.ok) return

      const maxPageRes = await itemService.getMaxPage(filterBy)

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

  async function getPageIdxMyItems(pageToSet) {
    try {
      // console.log('MyItems', pageToSet)
      // return
      const filterBy = { ...filter, pageIdx: pageToSet }
      // setItemFilter(filterBy)
      const items = await getPageItems(filterBy)
      return items
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
          getPageIdxItems={getPageIdxMyItems}
          extraKey={routes.MY_ITEMS}
          maxPage={maxPage}
          refreshingFilter={{
            ...itemService.getDefaultFilter(),
            soldBy: user._id,
          }}
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
