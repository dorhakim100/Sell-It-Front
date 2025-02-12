import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from '../config/color'

import CustomText from './CustomText'
import CustomImagePicker from './CustomImagePicker'

import { Image } from 'react-native-expo-image-cache'

function ProfileBanner({ user, isChat }) {
  const profile = {
    name: user.fullname,
    extra: user.extra,
    image: user.image,
  }
  return (
    <View
      style={{
        ...styles.container,
        marginBottom: isChat ? 0 : styles.container.marginBottom,
      }}
    >
      {(profile.image && (
        <Image uri={profile.image} style={styles.image} />
      )) || <MaterialIcons name='account-circle' size={60} color={'tomato'} />}
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{profile.name}</CustomText>
        <CustomText style={styles.extra}>{profile.extra}</CustomText>
      </View>
      <View style={styles.timeContainer}>
        {isChat && (
          <CustomText>
            {new Date(Date.now()).toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </CustomText>
        )}
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
    marginBottom: 25,
    backgroundColor: colors.strongWhite,
    justifyContent: 'space-between',
  },

  nameContainer: {
    gap: 5,
    flex: 1,
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
  extra: {
    fontWeight: 400,
    fontSize: 16,
    color: colors.subText,
  },
  timeContainer: {},
})

export default ProfileBanner
