import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Screen from './Screen'
import CustomTextInput from '../cmps/forms/CustomTextInput'
import CustomButton from '../cmps/CustomButton'

import * as Yup from 'yup'
import { Formik } from 'formik'

import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomText from '../cmps/CustomText'
import CustomFormikForm from '../cmps/forms/CustomFormikForm'

import defaultStyles from '../config/styles'
import { makeId } from '../services/utils'

import paths from '../navigation/routes'
import { signup } from '../store/actions/user.actions'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'
import { setIsLoading } from '../store/actions/system.actions'

import loader from '../animation/loader/loader.json'

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().min(2).label('Fullname'),
  username: Yup.string().required().min(2).label('Username'),
  password: Yup.string().required().min(6).label('Password'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string()
    .required('Phone is required')
    .test(
      'is-valid-phone',
      'Phone number is invalid',
      (value) => /^[\d+\-\s()]+$/.test(value) // Allow digits, spaces, (), +, -
    )
    .label('Phone'),
})

export default function SignupScreen({ navigation }) {
  const [values, setValues] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  })
  const [signupError, setSignupError] = useState(false)
  const isLoading = useSelector(
    (stateSelector) => stateSelector.systemModule.isLoading
  )

  const inputs = [
    {
      key: makeId(),
      name: 'fullname', // Add name property
      placeholder: 'Full Name',
      icon: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),
      autoCapitalize: 'words',
      type: 'text',
    },
    {
      key: makeId(),
      name: 'username', // Add name property
      placeholder: 'Username',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),
      autoCapitalize: 'none',
      type: 'text',
    },
    {
      key: makeId(),
      name: 'password', // Add name property
      placeholder: 'Password',
      icon: (
        <MaterialIcons
          name='password'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),
      isPassword: true,
      autoCapitalize: 'none',
      type: 'text',
    },
    {
      key: makeId(),
      name: 'email', // Add name property
      placeholder: 'Email',
      icon: (
        <Entypo name='email' size={24} color={defaultStyles.colors.subText} />
      ),
      autoCapitalize: 'none',
      keyboardType: 'email-address',
      type: 'text',
    },
    {
      key: makeId(),
      name: 'phone', // Add name property
      placeholder: 'Phone',
      icon: (
        <Entypo name='phone' size={24} color={defaultStyles.colors.subText} />
      ),
      keyboardType: 'numeric',
      type: 'text',
    },
  ]

  const navigateToAccount = () =>
    navigation.replace(paths.MAIN, { screen: paths.ACCOUNT })
  const navigateToLogin = () => navigation.replace(paths.LOGIN)

  async function onSubmit(values) {
    try {
      setIsLoading(true)
      const res = await signup({ ...values, isAdmin: false })
      setIsLoading(false)
      if (!res.ok) return setSignupError(true)
      navigateToAccount()
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading)
    return <CustomLottieAnimation animation={loader} visible={isLoading} />

  return (
    <Screen style={styles.container} hasNavigationBar={true}>
      <Image source={require('../imgs/sell-it-logo.png')} style={styles.logo} />

      <CustomFormikForm
        inputs={inputs}
        button={'Signup'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={values}
      />
      <View style={styles.errorContainer}>
        {signupError && (
          <CustomText style={defaultStyles.error}>
            {'Username Email or Phone taken'}
          </CustomText>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Already a member?' onPress={navigateToLogin} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},

  logo: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: 50,
    margin: 20,
  },
  errorContainer: {
    alignSelf: 'center',
  },
})
