import { create } from 'apisauce'
import cache from '../utility/cache'

// const MY_IP = '192.168.1.237' // home
// const MY_IP = '192.168.200.208' // work
const MY_IP = 'localhost' // or '127.0.0.1'

const BACKEND_PORT = 3030

const apiClient = create({
  baseURL: `http://${MY_IP}:${BACKEND_PORT}/api`,
})

const get = apiClient.get
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)
  console.log(response)
  if (response.ok) {
    cache.store(url, response.data)
    return response
  }

  const data = await cache.get(url)
  return data ? { ok: true, data } : response
}

export default apiClient
