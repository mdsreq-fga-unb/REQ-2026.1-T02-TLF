import axios from 'axios'
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './index'
import { api } from '../api/axios-client'
import { mapPullChanges, mapPushChanges } from './sync-mappers'

let isSyncing = false

const isNetworkError = (error: unknown) => axios.isAxiosError(error) && !error.response

async function runSync(): Promise<void> {
  await synchronize({
    database,
    migrationsEnabledAtVersion: 2,
    // O backend particiona created/updated por timestamp (createdAt > lastPulledAt). Com qualquer
    // descompasso de relógio entre device e servidor, um registro já existente pode voltar como
    // "created" — isso trata esse caso como update em vez de logar erro de diagnóstico.
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
    if (isNetworkError(error)) return

    console.error('Sync falhou, tentando retry:', error)

    try {
      await runSync()
    } catch (retryError) {
      if (!isNetworkError(retryError)) {
        console.error('Sync falhou após retry:', retryError)
      }
    }
  } finally {
    isSyncing = false
  }
}
