import { saveTokens, clearTokens } from './token-storage'

type LoginResponse = {
  user: { id: string; name: string; email: string }
  accessToken: string
  refreshToken: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  if (!email || !password) {
    throw new Error('Preencha e-mail e senha')
  }

  const response: LoginResponse = {
    user: { id: '1', name: 'TESTE', email: email },
    accessToken: 'string',
    refreshToken: 'string',
  }

  await saveTokens(response.accessToken, response.refreshToken)
  return response
}

export async function logout(): Promise<void> {
  await clearTokens()
}
