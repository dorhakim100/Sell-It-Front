import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

import AntDesign from '@expo/vector-icons/AntDesign'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { updateUser } from '../store/actions/user.actions'

import Screen from './Screen'
import CustomText from '../cmps/CustomText'
import ProfileBanner from '../cmps/ProfileBanner'
import CustomImagePicker from '../cmps/CustomImagePicker'
import CustomFormikForm from '../cmps/forms/CustomFormikForm'

import defaultStyles from '../config/styles'
import paths from '../navigation/routes'

const validationSchema = Yup.object().shape({
  fullname: Yup.string().label('Full Name'),
  image: Yup.array().label('Image'),
})

export default function AccountSettings({ navigation }) {
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)
  console.log(user)

  const [values, setValues] = useState({
    fullname: '',
    image: [],
  })

  const inputs = [
    {
      placeholder: 'Full Name',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'fullname',
      type: 'text',
    },

    {
      icon: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'image',
      type: 'imagePicker',
      maxImages: 1,
    },
  ]

  const navigateToAccount = () =>
    navigation.replace(paths.MAIN, { screen: paths.ACCOUNT })

  async function onSubmit(values) {
    try {
      const { fullname, image } = values
      const userToSave = {
        ...user,
        fullname: fullname ? fullname : user.fullname,
        image: image[0] && image[0].uri ? image[0].uri : user.image,
      }
      const res = await updateUser(userToSave)
      if (res) {
        Alert.alert(
          'Success!', // Title of the alert
          'Profile changed successfully', // Message
          [
            { text: 'Return', onPress: navigateToAccount },
            {
              text: 'Ok', // Button text
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // Optional: styles the button as a cancel button
            },
          ]
        )
      } else {
        Alert.alert(
          'Login', // Title of the alert
          'To add item, first Login', // Message
          [
            {
              text: 'Cancel', // Button text
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // Optional: styles the button as a cancel button
            },
            { text: 'OK', onPress: navigateToLogin },
          ]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Screen>
      <ProfileBanner user={user} />
      <CustomFormikForm
        inputs={inputs}
        button={'Save'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={values}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
