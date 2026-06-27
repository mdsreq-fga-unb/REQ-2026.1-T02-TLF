import axios from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from './token-storage'

const baseURL = process.env.EXPO_PUBLIC_API_URL

if (__DEV__ && !process.env.JEST_WORKER_ID && (!baseURL || baseURL.includes(':8081'))) {
  console.warn(
    `[api] EXPO_PUBLIC_API_URL seems invalid (${baseURL ?? 'undefined'}). Expected something like http://<LAN-IP>:3000/api/v1`,
  )
}

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes('/auth/refresh')
    ) {
      original._retry = true

      const refreshToken = await getRefreshToken()
      if (!refreshToken) {
        await clearTokens()
        return Promise.reject(error)
      }

      try {
        const { data } = await api.post('/auth/refresh', { refreshToken })
        await saveTokens(data.accessToken, data.refreshToken)

        original.headers = original.headers ?? {}
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch (refreshError) {
        await clearTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
