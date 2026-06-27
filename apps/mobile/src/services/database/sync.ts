import axios from 'axios'
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './index'
import { api } from '../api/axios-client'
import { mapPullChanges, mapPushChanges } from './sync-mappers'

let isSyncing = false

const isNetworkError = (error: unknown) => axios.isAxiosError(error) && !error.response

const isClientError = (error: unknown) =>
  axios.isAxiosError(error) &&
  error.response?.status != null &&
  error.response.status >= 400 &&
  error.response.status < 500

function toLastUpdatedAtParam(lastPulledAt: number | undefined) {
  if (lastPulledAt == null || Number.isNaN(lastPulledAt)) {
    return new Date(0).toISOString()
  }

  return new Date(lastPulledAt).toISOString()
}

async function runSync(): Promise<void> {
  await synchronize({
    database,
    migrationsEnabledAtVersion: 2,
    sendCreatedAsUpdated: true,

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
            lastUpdatedAt: toLastUpdatedAtParam(lastPulledAt),
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
    if (isNetworkError(error)) return

    if (isClientError(error)) {
      console.warn(
        '[sync] Falha de sincronização:',
        axios.isAxiosError(error) ? error.response?.status : error,
      )
      return
    }

    console.error('Sync falhou:', error)
  } finally {
    isSyncing = false
  }
}
