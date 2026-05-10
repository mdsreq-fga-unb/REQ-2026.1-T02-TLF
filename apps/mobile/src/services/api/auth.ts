import { saveTokens, clearTokens } from './token-storage'

export type AuthSessionResponse = {
  user: { id: string; name: string; email: string }
  accessToken: string
  refreshToken: string
}

export async function login(email: string, password: string): Promise<AuthSessionResponse> {
  if (!email || !password) {
    throw new Error('Preencha e-mail e senha')
  }

  const response: AuthSessionResponse = {
    user: { id: '1', name: 'TESTE', email: email },
    accessToken: 'string',
    refreshToken: 'string',
  }

  await saveTokens(response.accessToken, response.refreshToken)
  return response
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

  const response: AuthSessionResponse = {
    user: { id: '1', name, email },
    accessToken: 'string',
    refreshToken: 'string',
  }

  await saveTokens(response.accessToken, response.refreshToken)
  return response
}

export async function logout(): Promise<void> {
  await clearTokens()
}
