import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import Categories from './Categories'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'
import { capitalizeWords } from '../services/util.service'
import { LinearGradient } from 'react-native-svg'
import colors from '../config/color'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import CustomCarousel from './CustomCarousel'
import ProfileBanner from './ProfileBanner'

const screenWidth = Dimensions.get('window').width
const imageWidth = screenWidth * 0.8

const ItemContainer = ({ currItem, onPress, addToCart, user }) => {
  const [isHome, setIsHome] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <CustomCarousel images={currItem.images} />

        <View style={styles.nameContainer}>
          <Text style={styles.label}>{capitalizeWords(currItem.label)}</Text>
          <Text style={styles.num}>{`${currItem.price}$`}</Text>
        </View>

        {/* <Types types={currItem.types} /> */}
        <CustomButton
          onPress={addToCart}
          disabled={user.items.includes(currItem._id)}
        >
          Add To Cart
        </CustomButton>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'center',
    width: screenWidth,
    shadowColor: 'gray',
    shadowOffset: { width: 2, heigh: 0 },
    shadowOpacity: 1,
    elevation: 20, // shadow for android users
    backgroundColor: colors.whiteBackground,
    borderRadius: 15,
    padding: 10,
    marginTop: 15,
    marginBottom: 5,
    width: screenWidth * 0.9,

    alignSelf: 'center',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
  },

  nameContainer: {
    // flexDirection: 'row',
    gap: 5,
  },

  spriteImg: {
    // width: screenWidth * 0.8,
    // height: screenWidth * 0.8,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 25,
    // fontFamily: 'Courier', // for ios only
    // fontFamily: 'Roboto', // for android only
    // fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    // or using a dedicated props
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir',
        // color: 'crimson',
      },
      android: {
        fontFamily: 'Roboto',

        // color: 'royalblue',
      },
    }),
  },
  num: {
    textAlign: 'center',
    fontSize: 15,
  },
})

export default ItemContainer
