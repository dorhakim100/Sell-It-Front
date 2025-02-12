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

import Categories from './Categories'
import ProfileBanner from './ProfileBanner'

import defaultStyles from '../config/styles'
import { itemService } from '../services/item/item.service'
import CustomButton from './CustomButton'

const screenWidth = Dimensions.get('window').width
export default function ChatPreview({ chat }) {
  return (
    <TouchableOpacity style={styles.container}>
      <ProfileBanner
        user={{
          ...chat.user,
          extra: chat.messages[chat.messages.length - 1].content,
        }}
        isChat={true}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // justifyContent: 'space-between',
    // paddingBottom: 15,
    // alignItems: 'center',
    // padding: 5,
    // shadowColor: 'gray',
    // shadowOffset: { width: 1, heigh: 10 },
    // shadowOpacity: 0.5,
    backgroundColor: defaultStyles.colors.lightGray,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    // marginVertical: 10,
    gap: 10,
  },
})
