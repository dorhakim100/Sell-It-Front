import * as Location from 'expo-location'
import { useState, useEffect } from 'react'

export default function useLocation() {
  const [location, setLocation] = useState({
    latitude: 40.7128, // Default: New York
    longitude: -74.006,
  })

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync() // Request foreground permission
      if (!granted) return

      const position = await Location.getLastKnownPositionAsync()
      if (!position) {
        console.log('No last known location available')
        return
      }

      const { latitude, longitude } = position.coords
      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01,
      })
    } catch (err) {
      console.log('Error fetching location:', err)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return location
}
