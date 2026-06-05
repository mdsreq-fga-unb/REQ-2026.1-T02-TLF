import { useEffect, useRef } from 'react'
import { AppState, type AppStateStatus } from 'react-native'
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo'
import { trySync } from '@/services/sync'

const isOnline = (state: NetInfoState) =>
  Boolean(state.isConnected) && state.isInternetReachable !== false

// Globally drives offline-first reconciliation: pushes pending local changes
// (and pulls server changes) whenever connectivity is restored or the app
// returns to the foreground. This is what makes an action taken offline — e.g.
// deleting a transaction in airplane mode — sync automatically once back online,
// without the user having to navigate between screens to trigger it.
//
// Mount this once at the app root. trySync() coalesces concurrent calls and
// swallows errors, so firing from multiple sources is safe.
export function useAutoSync() {
  // null = unknown (first event). We only sync on a real offline → online
  // transition, so we never double-fire with the screens' own mount syncs.
  const wasOnline = useRef<boolean | null>(null)

  useEffect(() => {
    const unsubscribeNet = NetInfo.addEventListener((state) => {
      const online = isOnline(state)
      const previous = wasOnline.current
      wasOnline.current = online
      if (online && previous === false) {
        void trySync()
      }
    })

    const handleAppState = (status: AppStateStatus) => {
      if (status === 'active') void trySync()
    }
    const appStateSub = AppState.addEventListener('change', handleAppState)

    return () => {
      unsubscribeNet()
      appStateSub.remove()
    }
  }, [])
}
