import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import defaultStyles from '../config/styles'

export default function CustomCheckInput({ items, values }) {
  return (
    <ScrollView
      contentContainerStyle={styles.itemsContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {items.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => item.onPress(item.label)}
            key={item.value}
            style={
              values.includes(item.label) ? styles.checked : styles.notChecked
            }
          >
            {item.icon}
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  itemsContainer: {
    gap: 10,
  },

  checked: {
    borderWidth: 4,
    borderColor: defaultStyles.colors.primary,

    borderRadius: 50,
  },
  notChecked: {
    borderWidth: 4,
    borderColor: defaultStyles.colors.lightGray,

    borderRadius: 50,
  },
})
