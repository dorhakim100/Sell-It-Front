import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import useLocation from '../services/customHooks/useLocation'
import MapView, { Marker } from 'react-native-maps'

import defaultStyles from '../config/styles'

export default function CustomMap({ cords, isFixed }) {
  let location
  if (!isFixed) {
    location = useLocation()
  } else {
    location = cords
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // provider='google' // Use Google Maps
        // initialRegion={{
        //   latitude: 37.7749, // Default latitude (San Francisco)
        //   longitude: -122.4194, // Default longitude (San Francisco)
        //   latitudeDelta: 0.05,
        //   longitudeDelta: 0.05,
        // }}
        region={location}
        showsUserLocation
      >
        {location && <Marker coordinate={location} title='You are here' />}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '90%', // Slightly reduce width for a better shadow effect
    // height: '90%', // Adjust height as needed
    // width: 400,
    height: 300,
    borderRadius: 15, // Smooth edges
    overflow: 'hidden', // Prevent shadow from getting cut off
    padding: 20,

    // iOS Shadow
    shadowColor: defaultStyles.colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    // Android Shadow
    elevation: 10,
  },
})
