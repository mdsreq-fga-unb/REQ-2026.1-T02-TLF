import { database } from '@/services/database'
import { useAuthStore } from '@/stores/auth'
import { api } from './axios-client'
import { clearAuthStorage } from './token-storage'
import { deleteAccount } from './user'

export async function finalizeLocalSignOut() {
  await clearAuthStorage()
  useAuthStore.getState().logout()
  await database.write(async () => {
    await database.unsafeResetDatabase()
  })
}

export async function signOut() {
  try {
    await api.post('/auth/logout')
  } catch {
    // Offline logout still clears local session.
  }

  await finalizeLocalSignOut()
}

export async function deleteAccountAndSignOut() {
  await deleteAccount()
  await finalizeLocalSignOut()
}
