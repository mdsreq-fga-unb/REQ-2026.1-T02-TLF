import { getUserProfile } from '@/services/api/user'
import { getStoredTokens, getUser, saveUser } from '@/services/api/token-storage'
import { useAuthStore } from '@/stores/auth'
import { useEffect } from 'react'
import { runNotificationChecks } from '@/services/notification/notification-checker'

export function useAuthBootstrap() {
  const setSession = useAuthStore((state) => state.setSession)
  const finishBootstrap = useAuthStore((state) => state.finishBootstrap)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      try {
        const { accessToken, refreshToken } = await getStoredTokens()
        const storedUser = await getUser()

        if (accessToken && refreshToken && storedUser) {
          if (!cancelled) {
            setSession(storedUser, accessToken, refreshToken)
            void runNotificationChecks()
          }

          void getUserProfile()
            .then(async (profile) => {
              if (cancelled) return
              await saveUser(profile)
              setSession(profile, accessToken, refreshToken)
            })
            .catch(() => {
              // Offline or expired token: keep local session until explicit logout.
            })
        }
      } finally {
        if (!cancelled) {
          finishBootstrap()
        }
      }
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [finishBootstrap, setSession])
}
