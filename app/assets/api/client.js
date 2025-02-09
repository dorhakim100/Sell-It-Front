import { create } from 'apisauce'
import cache from '../utility/cache'

import authStorage from '../api/user/storage'

// const MY_IP = '192.168.1.237' // home
// const MY_IP = '192.168.200.208' // work
const MY_IP = 'localhost' // or '127.0.0.1'

const BACKEND_PORT = 3030

const apiClient = create({
  baseURL: `http://${MY_IP}:${BACKEND_PORT}/api`,
})

const get = apiClient.get
const put = apiClient.put
apiClient.get = async (url, params, axiosConfig) => {
  // const token = await authStorage.getToken()
  // if (token) {
  //   axiosConfig.headers = {
  //     ...axiosConfig.headers,
  //     Authorization: `Bearer ${token}`,
  //   }
  // }
  const response = await get(url, params, axiosConfig)

  if (response.ok) {
    cache.store(url, response.data)
    return response
  }

  const data = await cache.get(url)
  return data ? { ok: true, data } : response
}
apiClient.put = async (url, params, axiosConfig) => {
  const token = await authStorage.getToken()
  if (token) {
    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await put(url, params, axiosConfig)

  if (response.ok) {
    cache.store(url, response.data)
    return response
  }

  const data = await cache.put(url)
  return data ? { ok: true, data } : response
}

export default apiClient
