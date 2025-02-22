import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import { useSelector } from 'react-redux'

import expoPushTokenApi from '../../api/expoPushTokens'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

// const MY_IP = '192.168.1.237' // home
const MY_IP = '192.168.200.122' // work
// const MY_IP = 'localhost' // or '127.0.0.1'

const BACKEND_PORT = 3030

const baseURL = `http://${MY_IP}:${BACKEND_PORT}/api`

export default useNotifications = (notificationListener) => {
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)
  useEffect(() => {
    if (!user) return
    registerForPushNotificationsAsync()
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('hello')
      }
    )
    return () => subscription.remove()
  }, [user])

  async function registerForPushNotificationsAsync() {
    if (!user) return
    try {
      const { status } = await Notifications.requestPermissionsAsync()

      if (status !== 'granted') {
        console.log('Permission for notifications was denied')
        return
      }
      const projectId = 'ed8d74bf-5210-40b6-84e4-8031fa73f48c'

      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId,
      })

      expoPushTokenApi.register(expoPushToken.data)
      const token = expoPushToken.data
      await fetch(`${baseURL}/user/expoToken/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, token }),
      })
    } catch (error) {
      console.error('Error getting notification permissions:', error)
    }
  }
}
