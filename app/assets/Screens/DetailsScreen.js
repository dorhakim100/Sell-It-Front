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
import ProfileBanner from '../cmps/ProfileBanner'
import CustomMap from '../cmps/CustomMap'
import { convertCorsToNumber } from '../services/util.service'
import { ScrollView } from 'react-native-gesture-handler'

const screenWidth = Dimensions.width

function DetailsScreen() {
  const currItem = useSelector(
    (stateSelector) => stateSelector.itemModule.currItem
  )
  const items = useSelector((stateSelector) => stateSelector.itemModule.items)

  const [index, setIndex] = useState()

  const [cords, setCords] = useState()

  useEffect(() => {
    const idx = items.findIndex((item) => item._id === currItem._id)
    setIndex(idx)

    setCords({
      ...currItem.location, // Spread the existing location if necessary
      latitude: parseFloat(currItem.location.latitude),
      longitude: parseFloat(currItem.location.longitude),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    })
  }, [currItem])

  return (
    <Screen>
      <ScrollView>
        {/* <View style={styles.prevNextButtons}>
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
      </View> */}
        <ItemContainer currItem={currItem} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{currItem.description}</Text>
        </View>
        <ProfileBanner user={currItem.userDetails} />
        <CustomMap cords={cords} isFixed={true} />{' '}
      </ScrollView>
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

  textContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  text: {
    fontSize: 20,
    textAlign: 'justify',
  },
})

export default DetailsScreen
