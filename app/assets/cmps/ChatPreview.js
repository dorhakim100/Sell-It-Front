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
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { Image } from 'react-native-expo-image-cache'
import { useSelector } from 'react-redux'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'

import Categories from './Categories'
import ProfileBanner from './ProfileBanner'

import defaultStyles from '../config/styles'
import { itemService } from '../services/item/item.service'
import CustomButton from './CustomButton'
import { userService } from '../api/user/user'

const screenWidth = Dimensions.get('window').width
export default function ChatPreview({
  chat,
  onSwipeableOpen,
  renderRightAction,
}) {
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const [chatter, setChatter] = useState(userService.getEmptyUser())
  const itemRef = useRef(null)

  console.log(chat)

  useEffect(() => {
    const loadChatter = () => {
      if (!user) return
      const idx = chat.userDetails.findIndex(
        (userToFind) => userToFind._id === user._id
      )
      idx === 1
        ? setChatter(chat.userDetails[0])
        : setChatter(chat.userDetails[1])
    }
    loadChatter()
  }, [user])
  if (user)
    return (
      <Swipeable
        renderRightActions={renderRightAction}
        onSwipeableOpen={() => onSwipeableOpen(itemRef)}
        ref={itemRef}
      >
        <TouchableOpacity style={styles.container}>
          <ProfileBanner
            user={{
              ...chatter,
              extra: chat.latestMessage.content,
            }}
            isChat={true}
          />
        </TouchableOpacity>
      </Swipeable>
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
