import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'

import Screen from './Screen'
import ProfileBanner from '../cmps/ProfileBanner'
import ItemPreview from '../cmps/ItemPreview'
import CustomListSection from '../cmps/CustomListSection'
import colors from '../config/color'
import ListItemSeparator from '../cmps/ListItemSeparator'
import CustomMap from '../cmps/CustomMap'

import paths from '../navigation/routes'
import { useSelector } from 'react-redux'
import CustomButton from '../cmps/CustomButton'
import { logout } from '../store/actions/user.actions'
import { ScrollView } from 'react-native'

export default function AccountScreen({ navigation }) {
  const profile = {
    name: 'Dor Hakim',
    mail: 'dorhakim100@gmail.com',
  }

  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)

  const list = [
    {
      text: 'My Items',
      icon: <ListIcon />,
      onPress: () => navigateToScreen(paths.MY_ITEMS),
    },
    {
      text: 'Wish List',
      icon: <WishlistIcon />,
      onPress: () => navigateToScreen(paths.LIST),
    },
    {
      text: 'My Messages',
      icon: <MessageIcon />,
      onPress: () => replaceToScreen(paths.MAIN, paths.MESSAGES),
    },
  ]

  function navigateToScreen(path) {
    navigation.navigate(path)
  }
  function replaceToScreen(path, screen) {
    navigation.replace(path, { screen })
  }

  async function handleLogout() {
    await logout()
  }

  return (
    <Screen>
      <ScrollView>
        {(user && (
          <>
            <ProfileBanner user={user} />
            <View style={styles.buttonContainer}>
              <CustomButton onPress={() => navigateToScreen(paths.ADD)}>
                Post
              </CustomButton>
            </View>
            <View style={styles.listsContainer}>
              {list.map((item, index) => (
                <React.Fragment key={index}>
                  <CustomListSection icon={item.icon} onPress={item.onPress}>
                    {item.text}
                  </CustomListSection>
                  {index < list.length - 1 && <ListItemSeparator />}
                </React.Fragment>
              ))}
            </View>
            <CustomListSection icon={<LogoutIcon />} onPress={handleLogout}>
              Log Out
            </CustomListSection>
          </>
        )) || (
          <View style={styles.loginButtonContainer}>
            <CustomButton onPress={() => navigateToScreen(paths.LOGIN)}>
              Login
            </CustomButton>
            <CustomButton
              onPress={() => navigateToScreen(paths.SIGNUP)}
              secondaryColor={true}
            >
              Signup
            </CustomButton>
          </View>
        )}
        <CustomMap
        // cords={{
        //   latitude: 32.1845,
        //   longitude: 34.8706,
        //   latitudeDelta: 0.05,
        //   longitudeDelta: 0.05,
        // }}
        // isFixed={true}
        />
      </ScrollView>
    </Screen>
  )
}

const ListIcon = () => {
  return (
    <View style={styles.listContainer}>
      <Feather style={styles.icon} name='list' size={24} color='black' />
    </View>
  )
}
const WishlistIcon = () => {
  return (
    <View style={styles.wishlistContainer}>
      <AntDesign
        name='shoppingcart'
        style={styles.icon}
        size={24}
        color='black'
      />
    </View>
  )
}
const MessageIcon = () => {
  return (
    <View style={styles.messageContainer}>
      <MaterialIcons
        style={styles.icon}
        name='message'
        size={24}
        color='black'
      />
    </View>
  )
}
const LogoutIcon = () => {
  return (
    <View style={styles.logoutContainer}>
      <Entypo name='log-out' style={styles.icon} size={24} color='black' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    // alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    marginBottom: 25,
  },

  loginButtonContainer: {
    alignSelf: 'center',
    marginVertical: 15,
    gap: 10,
  },

  listsContainer: {
    marginBottom: 20,
  },

  listContainer: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    margin: 10,
  },
  wishlistContainer: {
    backgroundColor: colors.addGreen,
    borderRadius: 50,
    margin: 10,
  },
  messageContainer: {
    backgroundColor: colors.second,
    borderRadius: 50,
    margin: 10,
  },
  logoutContainer: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    margin: 10,
  },
  icon: {
    padding: 10,
    color: colors.strongWhite,
  },
})
