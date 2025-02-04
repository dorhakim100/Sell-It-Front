import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'

import { useSelector } from 'react-redux'
import { loadItem, navItem } from '../store/actions/item.actions'

import Constants from 'expo-constants'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'
import ItemContainer from '../cmps/ItemContainer'
import Screen from './Screen'

const screenWidth = Dimensions.width

function DetailsScreen() {
  const currItem = useSelector(
    (stateSelector) => stateSelector.itemModule.currItem
  )
  const items = useSelector((stateSelector) => stateSelector.itemModule.items)

  const [index, setIndex] = useState()

  useEffect(() => {
    console.log(currItem)
    const idx = items.findIndex((item) => item._id === currItem._id)
    console.log(idx)
    setIndex(idx)
  }, [currItem])

  return (
    <Screen>
      <View style={styles.prevNextButtons}>
        <CustomButton
          handlePress={async () => await navItem(index - 1)}
          disabled={index === 0}
        >
          Previous
        </CustomButton>
        <CustomButton
          handlePress={async () => await navItem(index + 1)}
          disabled={index === items.length - 1}
        >
          Next
        </CustomButton>
      </View>

      <ItemContainer currItem={currItem} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{currItem.entry}</Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  prevNextButtons: {
    padding: 5,
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },

  textContainer: {},
  text: {
    fontSize: 20,
    textAlign: 'justify',
  },
})

export default DetailsScreen
