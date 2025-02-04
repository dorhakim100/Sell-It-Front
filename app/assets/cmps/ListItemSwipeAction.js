import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/color'
import { TouchableOpacity } from 'react-native'

function ListItemSwipeAction({ onPress, backgroundColor, icon }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.container, backgroundColor }}>{icon}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ListItemSwipeAction
