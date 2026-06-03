import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export async function saveTokens(accessToken: string, refreshToken: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
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

export type StoredTokens = {
  accessToken: string | null
  refreshToken: string | null
}

export async function getStoredTokens(): Promise<StoredTokens> {
  const accessToken = await getAccessToken()
  const refreshToken = await getRefreshToken()

  return { accessToken, refreshToken }
}

export async function debugStoredTokens(): Promise<StoredTokens> {
  const tokens = await getStoredTokens()
  // TODO: Remover quando sistema de categorias for implementado
  // eslint-disable-next-line no-console
  console.log('[debugStoredTokens]', tokens)
  return tokens
}
