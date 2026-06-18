import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './index'
import { api } from '../api/axios-client'
import { mapPullChanges, mapPushChanges } from './sync-mappers'

let isSyncing = false

async function runSync(): Promise<void> {
  await synchronize({
    database,
    migrationsEnabledAtVersion: 1,

    pullChanges: async ({ lastPulledAt }) => {
      const { data } = await api.get('/sync/pull', {
        params: {
          lastUpdatedAt: lastPulledAt ? new Date(lastPulledAt).toISOString() : undefined,
        },
      })

      return {
        changes: mapPullChanges(data.changes ?? {}),
        timestamp: new Date(data.timestamp).getTime(),
      }
    },

    pushChanges: async ({ changes, lastPulledAt }) => {
      await api.post(
        '/sync/push',
        { changes: mapPushChanges(changes) },
        {
          params: {
            lastUpdatedAt: new Date(lastPulledAt).toISOString(),
          },
        },
      )
    },
  })
}

export async function syncDatabase(): Promise<void> {
  if (isSyncing) return
  isSyncing = true

  try {
    await runSync()
  } catch (error) {
    console.error('Sync falhou, tentando retry:', error)

    try {
      await runSync()
    } catch (retryError) {
      console.error('Sync falhou após retry:', retryError)
    }
  } finally {
    isSyncing = false
  }
}
