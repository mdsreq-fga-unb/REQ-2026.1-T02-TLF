// The backend speaks this format directly so the mobile client's pull/push
// callbacks stay thin HTTP wrappers.

export type RawRecord = Record<string, string | number | boolean | null>

export type TableChanges = {
  created: RawRecord[]
  updated: RawRecord[]
  deleted: string[]
}

export type SyncChanges = Record<string, TableChanges>

export type SyncPullResult = {
  changes: SyncChanges
  timestamp: number
}
