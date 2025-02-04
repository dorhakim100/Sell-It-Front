import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../config/color'

function CustomListSection({ icon, children, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.strongWhite,
  },
})

export default CustomListSection
