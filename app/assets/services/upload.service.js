import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Platform } from 'react-native'

export const uploadService = {
  uploadImg,
}

async function uploadImg() {
  const CLOUD_NAME = 'dpsnczn5n'
  const UPLOAD_PRESET = 'Sell-It'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB limit
  // const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit

  // Request permission to access media library
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (permissionResult.granted === false) {
    alert('Permission to access the media library is required!')
    return
  }

  // Pick an image from the media library
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    // mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })

  if (!pickerResult.cancelled) {
    const fileUri = pickerResult.assets[0].uri
    const fileName = pickerResult.assets[0].fileName

    const fileSize = await getFileSize(fileUri)

    // Check if the file size exceeds the limit
    if (fileSize > MAX_FILE_SIZE) {
      alert('The file is too large. Please select a smaller image.')
      return
    }

    const formData = new FormData()
    console.log(pickerResult.assets[0].uri)
    console.log(pickerResult.assets[0].fileName)
    // Create a file object for React Native upload
    const file = {
      uri: fileUri,
      name: fileName,
      // type: 'image/jpeg', // Adjust the mime type if necessary
      type: 'image/png', // Adjust the mime type if necessary
    }

    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    // Sending a post method request to Cloudinary API
    try {
      const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
      const imgData = await res.json()
      console.log(imgData)
      return imgData.url
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

async function getFileSize(uri) {
  console.log(uri)
  const fileInfo = await FileSystem.getInfoAsync(uri)
  return fileInfo.size
}
