import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from '../config/color'

import CustomText from './CustomText'
import CustomImagePicker from './CustomImagePicker'

import { Image } from 'react-native-expo-image-cache'

function ProfileBanner({ user }) {
  const profile = {
    name: user.fullname,
    email: user.email,
    image: user.image,
  }
  return (
    <View style={styles.container}>
      {(profile.image && (
        <Image uri={profile.image} style={styles.image} />
      )) || <MaterialIcons name='account-circle' size={60} color={'tomato'} />}
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{profile.name}</CustomText>
        <CustomText style={styles.email}>{profile.email}</CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
    // marginTop: 25,
    // marginBottom: 40,
    marginVertical: 25,
    backgroundColor: colors.strongWhite,
  },

  nameContainer: {
    gap: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontWeight: 700,
    fontSize: 18,
  },
  email: {
    fontWeight: 400,
    fontSize: 16,
    color: colors.subText,
  },
})

export default ProfileBanner
