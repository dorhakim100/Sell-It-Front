import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import expoPushTokenApi from '../../api/expoPushTokens'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotificationsAsync()
    // const subscription = Notifications.addNotificationResponseReceivedListener(
    //   (response) => {
    //     console.log('hello')
    //   }
    // )
    // return () => subscription.remove()
  }, [])

  async function registerForPushNotificationsAsync() {
    try {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission for notifications was denied')
        return
      }
      const projectId = 'ed8d74bf-5210-40b6-84e4-8031fa73f48c'

      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      })

      expoPushTokenApi.register(token.data)
    } catch (error) {
      console.error('Error getting notification permissions:', error)
    }
  }
}
