import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import React from 'react'
import { useSelector } from 'react-redux'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import colors from '../config/color'

import CustomText from './CustomText'
import CustomImagePicker from './CustomImagePicker'
import CustomButton from './CustomButton'

import defaultStyles from '../config/styles'
import { chatService } from '../api/chat'

import routes from '../navigation/routes'
import { createNewChat, loadChat } from '../store/actions/chat.actions'

function ProfileBanner({ user, isChat, time, isContact, isRead }) {
  const loggedUser = useSelector(
    (stateSelector) => stateSelector.userModule.currUser
  )

  const profile = {
    name: user.fullname,
    extra: user.extra,
    image: user.image,
    time,
  }

  const navigation = useNavigation()

  async function onStartChat() {
    if (!loggedUser) {
      navigation.navigate(routes.LOGIN)
      return
    }
    try {
      const users = {
        from: loggedUser._id,
        to: user._id,
      }

      const existingChat = await chatService.checkIsChat(users)

      if (existingChat.data) {
        await loadChat(existingChat.data._id)
      } else {
        const res = await createNewChat(users)

        if (!res.ok) return alert(`Couldn't add chat`)

        await loadChat(res.data._id)
      }
      navigation.navigate(routes.CURR_CHAT)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View
      style={{
        ...styles.container,
        marginBottom: isChat ? 0 : styles.container.marginBottom,
      }}
    >
      {(profile.image && (
        <Image uri={profile.image} style={styles.image} />
      )) || <MaterialIcons name='account-circle' size={60} color={'tomato'} />}
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{profile.name}</CustomText>
        <CustomText style={styles.extra}>{profile.extra}</CustomText>
      </View>
      <View style={styles.extraContainer}>
        {isChat && profile.time && (
          <View style={styles.messagePropsContainer}>
            {!isRead && (
              <FontAwesome
                name='circle'
                size={24}
                color={defaultStyles.colors.primary}
              />
            )}
            <CustomText>
              {new Date(profile.time).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </CustomText>
          </View>
        )}
        {isContact && (
          <Button
            style={styles.button}
            buttonColor={defaultStyles.colors.primary}
            textColor={defaultStyles.colors.strongWhite}
            icon={'send'}
            mode='contained'
            contentStyle={{ flexDirection: 'row-reverse' }}
            onPress={onStartChat}
          >
            Contact
          </Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
    // marginTop: 25,
    // marginBottom: 40,
    marginBottom: 25,
    backgroundColor: colors.strongWhite,
    justifyContent: 'space-between',
  },

  nameContainer: {
    gap: 5,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontWeight: 700,
    fontSize: 18,
  },
  extra: {
    fontWeight: 400,
    fontSize: 16,
    color: colors.subText,
  },
  extraContainer: {},
  messagePropsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    alignItems: 'center',
    gap: 5,
  },
})

export default ProfileBanner
