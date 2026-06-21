import { useAuthStore } from '@/stores/auth'
import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { syncDatabase } from '@/services/database/sync'

export function useSync() {
  const { isAuthenticated } = useAuthStore()
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    if (!isAuthenticated) return

    syncDatabase()

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (appState.current === 'background' && nextState === 'active') {
        syncDatabase()
      }
      appState.current = nextState
    })

    return () => subscription.remove()
  }, [isAuthenticated])
}
