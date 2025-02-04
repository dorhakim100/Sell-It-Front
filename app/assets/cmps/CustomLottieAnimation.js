import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native'

export default function CustomLottieAnimation({
  animation,
  visible,
  loop = true,
}) {
  return (
    visible && (
      <LottieView
        source={animation}
        // height={200}
        width={200}
        loop={loop}
        autoPlay
        style={styles.container}
      />
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
})
