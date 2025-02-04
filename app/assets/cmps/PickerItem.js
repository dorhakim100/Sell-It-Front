import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { getRandomDarkHexColor } from '../services/util.service'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomText from './CustomText'

import defaultStyles from '../config/styles'

export default function PickerItem({ label, onPress, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {(icon && icon) || (
        <MaterialIcons
          name='catching-item'
          size={50}
          color={getRandomDarkHexColor()}
          style={styles.icon}
        />
      )}
      <CustomText style={styles.text}>{label}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    borderWidth: 1,
    borderRadius: 500,
    padding: 0,
  },
  text: {
    fontSize: 20,
  },
})
