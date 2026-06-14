import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto'

export type SyncTimestampFilter = Pick<SyncFindManyBaseDto, 'createdAfter' | 'updatedAfter'>

export function buildTimestampWhere(filter: SyncTimestampFilter) {
  const { createdAfter, updatedAfter } = filter

  if (createdAfter && updatedAfter) {
    return {
      OR: [{ createdAt: { gt: createdAfter } }, { updatedAt: { gt: updatedAfter } }],
    }
  }

  if (createdAfter) return { createdAt: { gt: createdAfter } }
  if (updatedAfter) return { updatedAt: { gt: updatedAfter } }

  return {}
}
