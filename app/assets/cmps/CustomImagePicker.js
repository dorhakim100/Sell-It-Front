import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import React, { useEffect, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'

import defaultStyles from '../config/styles'
import CustomButton from './CustomButton'
import { makeId } from '../services/utils'

export default function CustomImagePicker({ input }) {
  const [imagesUri, setImagesUri] = useState([])
  useEffect(() => {
    askPermission()
  }, [])

  const askPermission = async () => {
    try {
      const res = await ImagePicker.requestMediaLibraryPermissionsAsync()

      const { granted } = res
      if (!granted) {
        alert('You need to enable permission to access the library')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync()
      if (!res.canceled) {
        const img = res.assets[0].uri
        let newImages
        if (!imagesUri[0]) {
          newImages = [{ uri: img, id: makeId() }]
        } else {
          newImages = [...imagesUri, { uri: img, id: makeId() }]
        }
        console.log(newImages)
        setImagesUri(newImages)
        input.onSetImage(newImages)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onRemovePhoto = (imageId) => {
    Alert.alert(
      'Remove Photo', // Title of the alert
      'Do you want to remove the selected photo?', // Message
      [
        {
          text: 'Cancel', // Button text
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // Optional: styles the button as a cancel button
        },
        { text: 'OK', onPress: () => removeImg(imageId) },
      ]
    )
    return
  }

  const removeImg = (imageId) => {
    const newImages = imagesUri
    const idx = newImages.findIndex((image) => image.id === imageId)
    newImages.splice(idx, 1)
    setImagesUri([...newImages])
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.imgsContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {(imagesUri[0] &&
          imagesUri.map((image) => {
            return (
              <TouchableOpacity
                onPress={() => onRemovePhoto(image.id)}
                key={image.id}
              >
                <Image source={{ uri: image.uri }} style={styles.img} />
              </TouchableOpacity>
            )
          })) || (
          <Image source={require('../imgs/camera.jpg')} style={styles.img} />
        )}
      </ScrollView>
      <CustomButton handlePress={selectImage}>Upload</CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.input,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },

  imgsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  iconContainer: {
    marginInlineEnd: 10,
    // padding: 5,
  },
})
