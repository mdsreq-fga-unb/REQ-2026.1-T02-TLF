import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import { api } from './axios-client'
import { clearTokens, saveTokens } from './token-storage'

export type AuthSessionResponse = {
  user: { id: string; name: string; email: string }
  accessToken: string
  refreshToken: string
}

export async function login(email: string, password: string): Promise<AuthSessionResponse> {
  if (!email || !password) {
    throw new Error('Preencha e-mail e senha')
  }

  try {
    const response = await api.post<AuthSessionResponse>('/auth/login', { email, password })
    await saveTokens(response.data.accessToken, response.data.refreshToken)
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível entrar. Tente novamente.'))
  }
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function register({
  name,
  email,
  password,
}: RegisterPayload): Promise<AuthSessionResponse> {
  if (!name || !email || !password) {
    throw new Error('Preencha todos os campos')
  }

  try {
    const response = await api.post<AuthSessionResponse>('/auth/register', {
      name,
      email,
      password,
    })
    await saveTokens(response.data.accessToken, response.data.refreshToken)
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível cadastrar. Tente novamente.'))
  }
}

export async function logout(): Promise<void> {
  await clearTokens()
}
