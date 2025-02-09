import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import { Image } from 'react-native-expo-image-cache'

import Carousel from 'react-native-reanimated-carousel'

const screenWidth = Dimensions.get('window').width
const imageWidth = screenWidth * 0.8
const HEIGHT = 200

const renderItem = ({ item }) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Image
      uri={item}
      style={{ width: imageWidth * 0.8, height: HEIGHT, borderRadius: 10 }}
    />
  </View>
)

export default function CustomCarousel({ images }) {
  console.log(images)
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={imageWidth}
        height={HEIGHT}
        autoPlay
        autoPlayInterval={3000}
        data={images}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    // position: 'relative',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
  },
})
