import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import {
  capitalizeWords,
  getRandomDarkHexColor,
} from '../services/util.service'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomText from './CustomText'

import defaultStyles from '../config/styles'

export default function PickerItem({ label, onPress, icon, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color }}
    >
      {(icon && icon) || (
        <MaterialIcons
          name='catching-item'
          size={50}
          color={getRandomDarkHexColor()}
          style={styles.icon}
        />
      )}
      <CustomText style={styles.text}>{capitalizeWords(label)}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: 180,
    gap: 10,
    borderRadius: 100,
    height: 180,
    marginHorizontal: 5,

    shadowColor: '#000', // Black shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Soft shadow
    shadowRadius: 6, // Radius of the shadow spread
    elevation: 5, // For Android shadow
  },

  icon: {
    borderWidth: 1,
    borderRadius: 500,
    padding: 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    flexWrap: 'wrap', // Allow text to wrap to the next line
    width: '100%', // Set a width to control the wrapping
    textAlign: 'center',
    fontWeight: 600,
  },
})
