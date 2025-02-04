import React, { useState, useEffect, forwardRef, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'

import Types from './Types'

import defaultStyles from '../config/styles'
import { itemService } from '../services/item/item.service'

const screenWidth = Dimensions.get('window').width

function ItemPreview({ item, setItem, renderRightAction, onSwipeableOpen }) {
  const itemRef = useRef(null)

  return (
    <Swipeable
      renderRightActions={renderRightAction}
      onSwipeableOpen={() => onSwipeableOpen(itemRef)}
      ref={itemRef}
    >
      <TouchableOpacity
        // underlayColor={defaultStyles.colors.blueHighlight}
        onPress={() => setItem(item._id)}
        style={styles.preview}
      >
        <View style={styles.container}>
          <Text style={styles.num}>{getFormattedNum(item.num)}</Text>

          <Image uri={item.sprites.pixel} style={styles.sprite}></Image>

          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.types}>
            <Types types={item.types} isSprite={true} />
          </View>
          <MaterialCommunityIcons
            name={'chevron-right'}
            size={20}
            color={defaultStyles.colors.darkGray}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-between',
    paddingBottom: 15,
    alignItems: 'center',
    padding: 5,
    shadowColor: 'gray',
    shadowOffset: { width: 1, heigh: 10 },
    shadowOpacity: 0.5,
    backgroundColor: defaultStyles.colors.whiteBackground,
  },

  preview: {},

  num: {
    ...defaultStyles.text,
    fontSize: 15,
    width: 50,
  },

  name: {
    ...defaultStyles.text,
    fontWeight: 'bold',
    fontWeight: '600',
    width: 120,
  },

  sprite: {
    height: 30,
    width: 30,
  },

  types: {
    // width: 250,
    width: 120,
  },
})

export default ItemPreview
