import { Prisma } from 'generated/prisma/client'

export type DeleteAccountInTransactionDto = {
  tx: Prisma.TransactionClient
  userId: string
  accountId: string
  invoiceIds: string[]
  recurrenceIds: string[]
}
