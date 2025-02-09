import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { CommonActions } from '@react-navigation/native'

import { Text, BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import { FAB } from 'react-native-paper'

import authStorage from '../api/user/storage'

import ExploreScreen from '../Screens/ExploreScreen'
import WelcomeScreen from '../Screens/WelcomeScreen'
import DetailsScreen from '../Screens/DetailsScreen'
import AccountScreen from '../Screens/AccountScreen'
import LoginScreen from '../Screens/LoginScreen'
import SignupScreen from '../Screens/SignupScreen'

import colors from '../config/color'
import MyList from '../Screens/MyList'
import MyItems from '../Screens/MyItems'
import AddScreen from '../Screens/AddScreen'

import defaultStyles from '../config/styles'
import NewListingButton from './NewListingButton'

import paths from './routes'
import { userService } from '../api/user/user'
import { setRemembered } from '../store/actions/user.actions'
import MessagesScreen from '../Screens/MessagesScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function CustomBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={paths.EXPLORE}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <>
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            activeColor={defaultStyles.colors.primaryDark}
            style={{}}
            activeIndicatorStyle={{
              // fontSize: 50,
              // padding: 20,

              backgroundColor:
                state.index === 1 ? colors.lightGray : colors.softPurple, // Keep default when not active
            }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (event.defaultPrevented) {
                preventDefault()
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                })
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key]
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 })
              }

              return null
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key]
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title

              return label
            }}
          />
          <FAB
            // size='small'
            size='medium'
            style={{
              position: 'absolute',
              bottom: 70,
              borderRadius: 50,
              alignSelf: 'center',

              backgroundColor:
                state.index === 1 ? colors.primaryLight : colors.lightGray,
              color:
                state.index === 1 ? colors.strongWhite : colors.primaryDark,
            }}
            icon={({ size, color }) => (
              <Entypo
                name='shop'
                size={size}
                color={state.index === 1 ? colors.black : colors.darkGray}
              />
            )}
            // icon={'compass'}
            onPress={() => navigation.navigate(paths.EXPLORE)} // Navigate manually
          />
        </>
      )}
    >
      {/* <Tab.Screen
        name='Home'
        component={WelcomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                name='home'
                size={size}
                color={focused ? colors.primary : color}
              />
            )
          },
        }}
      /> */}
      <Tab.Screen
        name={paths.MESSAGES}
        component={MessagesScreen}
        options={{
          tabBarLabel: paths.MESSAGES,
          tabBarButton: (props) => <NewListingButton {...props} />,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <AntDesign
                name='message1'
                size={size}
                color={focused ? colors.primaryDark : color}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name={paths.EXPLORE}
        component={ExploreScreen}
        options={{
          tabBarLabel: paths.EXPLORE,

          tabBarIcon: ({ color, size, focused }) => {
            // return (
            //   <MaterialIcons
            //     name='explore'
            //     size={size}
            //     color={focused ? colors.primary : color}
            //   />
            // )
          },
        }}
      />
      {/* <Tab.Screen
        name='List'
        component={MyList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name='list'
                size={size}
                color={focused ? colors.primary : color}
              />
            )
          },
        }}
      /> */}
      <Tab.Screen
        name={paths.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarLabel: paths.ACCOUNT,

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name='account-circle'
                size={size}
                color={focused ? colors.primaryDark : color}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

// function SettingsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text variant='headlineMedium'>Settings!</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreContainer: {
    backgroundColor: 'tomato',
  },
})

export default function AppNavigator() {
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  return (
    <Stack.Navigator
      initialRouteName={user ? paths.MAIN : paths.WELCOME} // Set the welcome screen as the initial screen
      screenOptions={{ headerShown: true, headerTitle: '' }}
    >
      <Stack.Screen name={paths.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={paths.LOGIN} component={LoginScreen} />
      <Stack.Screen name={paths.SIGNUP} component={SignupScreen} />

      <Stack.Screen
        name={paths.MAIN}
        component={CustomBottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={paths.DETAILS}
        component={DetailsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={paths.ADD} component={AddScreen} />
      <Stack.Screen
        name={paths.MY_ITEMS}
        component={MyItems}
        options={{ headerShown: true, headerTitle: 'My Items' }}
      />
      <Stack.Screen
        name={paths.LIST}
        component={MyList}
        options={{ headerShown: true, headerTitle: 'Wishlist' }}
      />
    </Stack.Navigator>
  )
}
