import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import colors from '../config/color'

export default function NewListingButton() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
})
