import { CreateDeletedRecordsDto } from './dto/create-deleted-records.dto'

export async function createDeletedRecords(dto: CreateDeletedRecordsDto): Promise<void> {
  const { tx, userId, tableName, recordIds } = dto
  if (recordIds.length === 0) return

  await tx.deletedRecord.createMany({
    data: recordIds.map((recordId) => ({
      recordId,
      tableName,
      userId,
      deletedAt: new Date(),
    })),
  })
}
