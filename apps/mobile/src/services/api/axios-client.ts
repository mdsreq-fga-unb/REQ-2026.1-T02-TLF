import axios from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from './token-storage'

const baseURL = process.env.EXPO_PUBLIC_API_URL

if (__DEV__ && (!baseURL || baseURL.includes(':8081'))) {
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

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      try {
        const refreshToken = await getRefreshToken()
        const { data } = await api.post('/auth/refresh', { refreshToken })

        await saveTokens(data.accessToken, data.refreshToken)

        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        await clearTokens()
        /* useAuthStore.getState().logout()*/ // avisa o Zustand (precisa ser implementado)
      }
    }

    return Promise.reject(error)
  },
)
