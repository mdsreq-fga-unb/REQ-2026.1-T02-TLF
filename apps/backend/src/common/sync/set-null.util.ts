import { Prisma } from 'generated/prisma/client'

type TransactionClient = Prisma.TransactionClient

const now = () => new Date()

export async function nullifyTransactionCategoryRefs(
  tx: TransactionClient,
  categoryId: string,
): Promise<void> {
  await tx.transaction.updateMany({
    where: { categoryId },
    data: { categoryId: null, updatedAt: now() },
  })
}

export async function nullifyTransactionSubCategoryRefs(
  tx: TransactionClient,
  subCategoryId: string,
): Promise<void> {
  await tx.transaction.updateMany({
    where: { subCategoryId },
    data: { subCategoryId: null, updatedAt: now() },
  })
}

export async function nullifyTransactionRecurrenceRefs(
  tx: TransactionClient,
  recurrenceId: string,
): Promise<void> {
  await tx.transaction.updateMany({
    where: { recurrenceId },
    data: { recurrenceId: null, updatedAt: now() },
  })
}

export async function nullifyTransactionInvoiceRefs(
  tx: TransactionClient,
  invoiceId: string,
): Promise<void> {
  await tx.transaction.updateMany({
    where: { invoiceId },
    data: { invoiceId: null, updatedAt: now() },
  })
}

export async function nullifyTransactionDestinationAccountRefs(
  tx: TransactionClient,
  accountId: string,
): Promise<void> {
  await tx.transaction.updateMany({
    where: { destinationAccountId: accountId },
    data: { destinationAccountId: null, updatedAt: now() },
  })
}

export async function nullifyRecurrenceCategoryRefs(
  tx: TransactionClient,
  categoryId: string,
): Promise<void> {
  await tx.recurrence.updateMany({
    where: { categoryId },
    data: { categoryId: null, updatedAt: now() },
  })
}

export async function nullifyRecurrenceSubCategoryRefs(
  tx: TransactionClient,
  subCategoryId: string,
): Promise<void> {
  await tx.recurrence.updateMany({
    where: { subCategoryId },
    data: { subCategoryId: null, updatedAt: now() },
  })
}
