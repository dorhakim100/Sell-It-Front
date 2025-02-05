import Constants from 'expo-constants'
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'

import CustomConnectionMessage from '../cmps/CustomConnectionMessage'

import defaultStyles from '../config/styles'
import { ScrollView } from 'react-native-gesture-handler'

function Screen({ children, hasNavigationBar }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screen}>
        <>
          <CustomConnectionMessage hasNavigationBar={hasNavigationBar} />
          <ScrollView>{children}</ScrollView>
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // Ensure the SafeAreaView takes up the full screen
    backgroundColor: defaultStyles.colors.whiteBackground,
  },
})

export default Screen
