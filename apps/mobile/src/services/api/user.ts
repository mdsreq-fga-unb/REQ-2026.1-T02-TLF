import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import { api } from './axios-client'
import type { StoredUser } from './token-storage'

export async function getUserProfile(): Promise<StoredUser> {
  try {
    const response = await api.get<StoredUser>('/user')
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível carregar o perfil.'))
  }
}

export async function deleteAccount(): Promise<void> {
  try {
    await api.delete('/user')
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível excluir a conta.'))
  }
}
