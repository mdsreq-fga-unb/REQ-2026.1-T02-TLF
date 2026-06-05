import { synchronize, hasUnsyncedChanges } from '@nozbe/watermelondb/sync'
import { database } from '../database'
import { api } from '../api/axios-client'

let inFlight: Promise<void> | null = null

export async function sync(): Promise<void> {
  // Junta chamadas concorrentes para nunca rodar duas sincronizações ao mesmo tempo.
  if (inFlight) return inFlight

  inFlight = synchronize({
    database,
    // Passamos a rastrear migrations de schema a partir da versão 1.
    migrationsEnabledAtVersion: 1,
    pullChanges: async ({ lastPulledAt }) => {
      const { data } = await api.get('/sync', {
        params: { lastPulledAt: lastPulledAt ?? 0 },
      })
      return { changes: data.changes, timestamp: data.timestamp }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      await api.post('/sync', { changes, lastPulledAt })
    },
  }).finally(() => {
    inFlight = null
  })

  return inFlight
}

export async function trySync(): Promise<boolean> {
  try {
    await sync()
    return true
  } catch (error) {
    if (__DEV__) console.warn('[sync] skipped:', (error as Error)?.message)
    return false
  }
}

export async function hasPendingChanges(): Promise<boolean> {
  return hasUnsyncedChanges({ database })
}
