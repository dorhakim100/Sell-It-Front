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
import { useSelector } from 'react-redux'

import * as ImagePicker from 'expo-image-picker'

import { Button } from 'react-native-paper'

import defaultStyles from '../config/styles'
import CustomButton from './CustomButton'
import { makeId } from '../services/utils'
import { uploadService } from '../services/upload.service'
import { setIsLoading } from '../store/actions/system.actions'

export default function CustomImagePicker({ input, initialImages }) {
  const [imagesUri, setImagesUri] = useState([])

  const isLoading = useSelector(
    (stateSelector) => stateSelector.systemModule.isLoading
  )

  useEffect(() => {
    askPermission()
  }, [])

  useEffect(() => {
    if (initialImages) {
      const modifiedImages = initialImages.map((image) => {
        return { uri: image, id: makeId() }
      })
      setImagesUri(modifiedImages)
      input.onSetImage(modifiedImages)
    }
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
    if (input.maxImages && imagesUri.length === input.maxImages) {
      const newImages = imagesUri
      newImages.splice(input.maxImages - 1, 1)
      setImagesUri([...newImages])
    }
    try {
      setIsLoading(true)
      // const res = await ImagePicker.launchImageLibraryAsync()
      const uri = await uploadService.uploadImg()

      if (!uri) return

      let newImages
      if (!imagesUri[0]) {
        newImages = [{ uri, id: makeId() }]
      } else {
        newImages = [...imagesUri, { uri, id: makeId() }]
      }

      setImagesUri(newImages)
      input.onSetImage(newImages)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
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
      {/* <CustomButton onPress={selectImage}>Upload</CustomButton> */}
      <Button
        icon='camera'
        mode='contained'
        onPress={selectImage}
        buttonColor={defaultStyles.colors.second}
        loading={isLoading}
        disabled={isLoading}
      >
        Upload
      </Button>
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
