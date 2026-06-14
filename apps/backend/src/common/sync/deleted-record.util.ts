import { Prisma, TableName } from 'generated/prisma/client'

type TransactionClient = Prisma.TransactionClient

export async function createDeletedRecords(
  tx: TransactionClient,
  userId: string,
  tableName: TableName,
  recordIds: string[],
): Promise<void> {
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
