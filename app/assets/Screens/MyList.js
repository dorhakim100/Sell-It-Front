import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  removeItem,
  loadItem,
  loadItems,
  getPageItems,
} from '../store/actions/item.actions'

import Screen from './Screen'
import ItemList from '../cmps/ItemList'

import EvilIcons from '@expo/vector-icons/EvilIcons'

import colors from '../config/color'
import { itemService } from '../services/item/item.service'
import CustomText from '../cmps/CustomText'

import paths from '../navigation/routes'

function MyList({ navigation }) {
  const myItems = useSelector(
    (stateSelector) => stateSelector.itemModule.myItems
  )
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const [userFilter, setUserFilter] = useState()

  const swipeable = {
    backgroundColor: colors.danger,
    icon: <EvilIcons name='trash' size={34} color={colors.strongWhite} />,
  }

  const setItem = async (itemId) => {
    await loadItems(itemService.getDefaultFilter())
    loadItem(itemId)

    navigation.navigate(paths.MAIN, { screen: paths.DETAILS })
  }

  const handleDelete = (item, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const itemId = item._id
    removeItem(itemId)
  }

  useEffect(() => {
    setUserFilter({
      ...itemService.getDefaultFilter(),
      itemsIds: user.items,
    })
    // setItems({
    //     ...itemService.getDefaultFilter(),
    //     itemsIds: user.items,
    //   })
  }, [])
  useEffect(() => {
    setItems(userFilter)
  }, [userFilter])

  const setItems = async (filter) => {
    if (!user) return
    console.log(user)
    try {
      const res = await loadItems(filter)
      if (!res.ok) return
      const maxPageRes = await itemService.getMaxPage(filter)
      if (!maxPageRes.ok) return
      setMaxPage(maxPageRes.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPageIdxItems = async (pageToSet) => {
    try {
      console.log(pageToSet)
      const filterBy = { ...userFilter, pageIdx: pageToSet }
      // console.log(filterBy)
      // setUserFilter(filterBy)
      return await getPageItems(filterBy)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Screen hasNavigationBar={true}>
      {(myItems && myItems.length === 0 && (
        <CustomText style={styles.emptyList}>Add Items first...</CustomText>
      )) || (
        <ItemList
          items={myItems}
          isRefreshing={isRefreshing}
          onSwipePress={handleDelete}
          swipeable={swipeable}
          setItem={setItem}
          getPageIdxItems={getPageIdxItems}
          extraKey={'myList'}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 30,
  },
})

export default MyList
