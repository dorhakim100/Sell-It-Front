import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'

import colors from '../config/color'

function CustomButton({ children, onPress, secondaryColor, disabled, style }) {
  const buttonContainer = {
    borderRadius: 30,

    padding: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 1, heigh: 1 },
    shadowOpacity: 0.5,
    backgroundColor: disabled
      ? secondaryColor
        ? colors.secondLight
        : colors.primaryLight
      : secondaryColor
      ? colors.second
      : colors.primary,
  }
  return (
    <TouchableOpacity
      style={buttonContainer}
      onPress={onPress}
      disabled={disabled}
    >
      {/* giving CustomButton style directly from parent */}
      <Text style={[styles.buttonText, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
})

export default CustomButton
