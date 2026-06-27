import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import { api } from './axios-client'
import { saveTokens, saveUser } from './token-storage'

export type AuthSessionResponse = {
  user: { id: string; name: string; email: string }
  accessToken: string
  refreshToken: string
}

async function persistSession(session: AuthSessionResponse) {
  await saveTokens(session.accessToken, session.refreshToken)
  await saveUser(session.user)
}

export async function login(email: string, password: string): Promise<AuthSessionResponse> {
  if (!email || !password) {
    throw new Error('Preencha e-mail e senha')
  }

  try {
    const response = await api.post<AuthSessionResponse>('/auth/login', { email, password })
    await persistSession(response.data)
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
    await persistSession(response.data)
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível cadastrar. Tente novamente.'))
  }
}
