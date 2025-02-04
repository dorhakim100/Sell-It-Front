import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { StatusBar } from 'react-native'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'
import CustomText from '../cmps/CustomText'

import defaultStyles from '../config/styles'
import paths from '../navigation/routes'

function WelcomeScreen({ navigation }) {
  const navigateToList = () => navigation.replace(paths.MAIN) // replace for disabling navigation back, navigation.navigate for going back
  const navigateToLogin = () => navigation.navigate(paths.LOGIN)
  const navigateToSignup = () => navigation.navigate(paths.SIGNUP)
  const navigateToAccount = () =>
    navigation.replace(paths.MAIN, { screen: paths.ACCOUNT }) // for navigating to a screen within bottom navigation
  return (
    <View style={styles.container}>
      <ImageBackground
        // resizeMode='contain'
        blurRadius={5}
        source={require('../imgs/background.jpeg')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={[
            'transparent',
            defaultStyles.colors.strongWhite,
            'transparent',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientOverlay}
        />
        <TouchableOpacity onPress={navigateToList}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Form')}> */}

          <View style={styles.logoContainer}>
            <Image
              source={require('../imgs/sell-it-logo.png')}
              style={styles.logo}
            ></Image>
            <CustomText style={styles.logoText}>Sell It</CustomText>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <CustomButton handlePress={navigateToLogin} style={styles.button}>
            Login
          </CustomButton>
          <CustomButton
            handlePress={navigateToSignup}
            style={styles.button}
            secondaryColor={true}
          >
            Signup
          </CustomButton>
        </View>

        <StatusBar style='auto' />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    // resizeMode: 'cover',
  },
  gradientOverlay: {
    // zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    zIndex: 2,
    gap: 5,
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    top: 170,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  logoText: {
    position: 'absolute',
    top: 380,
    alignSelf: 'center',
    fontFamily: 'pokefont',
    fontWeight: 700,
    fontSize: '30',
  },

  buttonsContainer: {
    // flexDirection: 'row',
    position: 'absolute',
    top: 440,
    width: 100,
    // alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
  },

  button: {
    flex: 1,
    textAlign: 'center',
  },
})

export default WelcomeScreen
