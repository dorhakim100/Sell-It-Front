import React from 'react'
import { useSelector } from 'react-redux'

import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomText from './CustomText'

const screenWidth = Dimensions.get('window').width

export default function UserChatHeader() {
  const otherUser = useSelector(
    (stateSelector) => stateSelector.chatModule.otherUser
  )
  console.log(otherUser)
  if (otherUser)
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {(otherUser.image && (
            <Image uri={otherUser.image} style={styles.image} />
          )) || (
            <MaterialIcons name='account-circle' size={40} color={'tomato'} />
          )}
        </View>
        <CustomText style={styles.text}>{otherUser.fullname}</CustomText>
        <View style={styles.blankContainer}></View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10, // adds vertical space without an explicit height
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    // width: screenWidth,
  },

  imageContainer: {
    // backgroundColor: 'tomato',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  blankContainer: {
    // backgroundColor: 'tomato',
    width: 40,
    height: 40,
  },
})
