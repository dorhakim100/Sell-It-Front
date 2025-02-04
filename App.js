import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { store } from './app/assets/store/store.js'
import { AppRegistry } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import * as SplashScreen from 'expo-splash-screen'
import authStorage from './app/assets/api/user/storage.js'

import WelcomeScreen from './app/assets/Screens/WelcomeScreen.js'
import ExploreScreen from './app/assets/Screens/ExploreScreen.js'
import DetailsScreen from './app/assets/Screens/DetailsScreen.js'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import CustomBottomNavigation from './app/assets/navigation/BottomNavigation.js'
import NavigationTheme from './app/assets/navigation/NavigationTheme.js'
import { setRemembered } from './app/assets/store/actions/user.actions.js'

const Stack = createStackNavigator()

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkRemembered = async () => {
      try {
        const user = await authStorage.setRememberedUser()
      } catch (err) {
        console.log(err)
      } finally {
        setIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    checkRemembered()
  }, [])

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='#4A90E2' />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider>
          <NavigationContainer theme={NavigationTheme}>
            <CustomBottomNavigation />
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Match splash screen background
  },
})
