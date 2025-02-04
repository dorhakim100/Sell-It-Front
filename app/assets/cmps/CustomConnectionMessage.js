import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import NetInfo, { useNetInfo } from '@react-native-community/netinfo'

import Ionicons from '@expo/vector-icons/Ionicons'

import Constants from 'expo-constants'
import CustomText from './CustomText'

import defaultStyles from '../config/styles'

export default function CustomConnectionMessage({ hasNavigationBar = false }) {
  const netInfo = useNetInfo()

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === 'false')
    return (
      <View
        style={{
          ...styles.container,
          top: hasNavigationBar ? 0 : styles.container.top,
        }}
      >
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>No Internet Connection</CustomText>
          <Ionicons
            name='cloud-offline-outline'
            size={24}
            color={defaultStyles.colors.strongWhite}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    top: Constants.statusBarHeight,

    width: '100%',

    alignSelf: 'center',

    justifyItems: 'center',
    zIndex: 20,

    alignItems: 'center',

    backgroundColor: defaultStyles.colors.danger,
    padding: 10,
  },

  textContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  text: {
    color: defaultStyles.colors.strongWhite,
    textAlign: 'center',
    fontWeight: 700,
  },
})
