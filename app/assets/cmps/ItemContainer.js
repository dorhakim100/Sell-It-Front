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

import Types from './Types'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'
import { LinearGradient } from 'react-native-svg'
import colors from '../config/color'
import CustomText from './CustomText'

const screenWidth = Dimensions.get('window').width

const ItemContainer = ({ currItem, onPress }) => {
  const [isHome, setIsHome] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setIsHome(!isHome)}>
            <CustomText>Home Sprite</CustomText>
          </TouchableOpacity>
          <Switch value={isHome} onValueChange={(value) => setIsHome(value)} />
        </View>
        <Image
          uri={isHome ? currItem.sprites.home : currItem.sprites.artwork}
          style={styles.spriteImg}
        ></Image>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {capitalizeFirstLetter(currItem.name)}
          </Text>
          <Text style={styles.num}>{getFormattedNum(currItem.num)}</Text>
        </View>
        <Types types={currItem.types} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    // gap: 5,

    alignItems: 'center',
    width: screenWidth,
    shadowColor: 'gray',
    shadowOffset: { width: 2, heigh: 0 },
    shadowOpacity: 1,
    elevation: 20, // shadow for android users
    backgroundColor: colors.whiteBackground,
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
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
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
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
