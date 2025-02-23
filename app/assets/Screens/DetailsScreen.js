import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native'

import { useSelector } from 'react-redux'
import {
  addToCart,
  loadItem,
  navItem,
  setIsEdit,
} from '../store/actions/item.actions'

import Constants from 'expo-constants'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'
import ItemContainer from '../cmps/ItemContainer'
import Screen from './Screen'
import ProfileBanner from '../cmps/ProfileBanner'
import CustomMap from '../cmps/CustomMap'
import { convertCorsToNumber } from '../services/util.service'
import { ScrollView } from 'react-native-gesture-handler'
import CustomText from '../cmps/CustomText'

import paths from '../navigation/routes'

const screenWidth = Dimensions.width

function DetailsScreen({ navigation, route }) {
  const currItem = useSelector(
    (stateSelector) => stateSelector.itemModule.currItem
  )
  const items = useSelector((stateSelector) => stateSelector.itemModule.items)

  const [index, setIndex] = useState()

  const [cords, setCords] = useState()

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)
  const isEdit = useSelector((stateSelector) => stateSelector.itemModule.isEdit)

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

  useFocusEffect(
    useCallback(() => {
      setIsEdit(false)
      // Optionally return a cleanup function if needed
      // return () => {
      // console.log('Screen unfocused')
      // }
    }, [])
  )

  const navigateToLogin = () => {
    navigation.navigate(paths.LOGIN)
  }
  const navigateToCart = () => {
    navigation.navigate(paths.LIST)
  }
  const navigateToAdd = () => {
    navigation.navigate(paths.ADD, { previousScreen: paths.DETAILS })
  }

  async function onAddToCart() {
    if (!user)
      return Alert.alert(
        'Login', // Title of the alert
        'To add item, first Login', // Message
        [
          {
            text: 'Cancel', // Button text
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel', // Optional: styles the button as a cancel button
          },
          { text: 'OK', onPress: navigateToLogin },
        ]
      )

    try {
      const newCart = [currItem._id, ...user.items]
      const res = await addToCart(newCart)

      if (!res)
        return Alert.alert(
          'Error', // Title of the alert
          'Could not add item to cart', // Message
          [
            {
              text: 'Cancel', // Button text
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // Optional: styles the button as a cancel button
            },
            // { text: 'OK', onPress: navigateToLogin },
          ]
        )

      return Alert.alert(
        'Success', // Title of the alert
        'Item added successfully!', // Message
        [
          {
            text: 'Cancel', // Button text
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel', // Optional: styles the button as a cancel button
          },
          { text: 'My Cart', onPress: navigateToCart },
        ]
      )
    } catch (err) {
      console.log(err)
    }
  }
  async function editItem() {
    if (!user)
      return Alert.alert(
        'Login', // Title of the alert
        'To add item, first Login', // Message
        [
          {
            text: 'Cancel', // Button text
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel', // Optional: styles the button as a cancel button
          },
          { text: 'OK', onPress: navigateToLogin },
        ]
      )
    setIsEdit(true)

    navigateToAdd()
  }

  return (
    <Screen>
      <ScrollView>
        <ItemContainer
          currItem={currItem}
          addToCart={onAddToCart}
          user={user}
          editItem={editItem}
        />
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>{currItem.description}</CustomText>
        </View>
        <ProfileBanner
          user={{
            fullname: currItem.userDetails.fullname,
            image: currItem.userDetails.image,
            extra: currItem.userDetails.phone,
            _id: currItem.userDetails._id,
          }}
          isContact={currItem.userDetails._id !== user._id ? true : false}
        />
        <CustomMap cords={cords} isFixed={true} />
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
    // width: '90%',
  },
  text: {
    padding: 20,
    fontSize: 20,
    textAlign: 'justify',
  },
})

export default DetailsScreen
