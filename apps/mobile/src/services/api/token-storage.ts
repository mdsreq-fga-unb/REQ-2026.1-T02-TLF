import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

export type StoredUser = { id: string; name: string; email: string }

export async function saveTokens(accessToken: string, refreshToken: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

export async function saveUser(user: StoredUser) {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user))
}

export async function getUser(): Promise<StoredUser | null> {
  const raw = await SecureStore.getItemAsync(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

export async function getRefreshToken() {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}

export async function clearUser() {
  await SecureStore.deleteItemAsync(USER_KEY)
}

export async function clearAuthStorage() {
  await clearTokens()
  await clearUser()
}

export type StoredTokens = {
  accessToken: string | null
  refreshToken: string | null
}

export async function getStoredTokens(): Promise<StoredTokens> {
  const accessToken = await getAccessToken()
  const refreshToken = await getRefreshToken()

  return { accessToken, refreshToken }
}
