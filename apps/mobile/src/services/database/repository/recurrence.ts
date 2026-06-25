import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Recurrence } from '../models/recurrece'
import { Transaction, type TransactionStatus } from '../models/transaction'

const RECURRENCES_TABLE = 'recurrences'
const TRANSACTIONS_TABLE = 'transactions'

const recurrencesCollection = () => database.get<Recurrence>(RECURRENCES_TABLE)
const transactionsCollection = () => database.get<Transaction>(TRANSACTIONS_TABLE)

export type RecurrenceInput = {
  accountId: string
  categoryId?: string | null
  subCategoryId?: string | null
  description: string
  amount: number
  isActive?: boolean
  chargeDate: number
  startDate: Date
  endDate?: Date | null
}

export type RecurrenceUpdateInput = Partial<RecurrenceInput>
export type RecurrenceUpdateScope = 'upcoming' | 'all'
export type RecurrenceDeleteScope = 'keep' | 'remove'

const applyRecurrenceFields = (
  recurrence: Recurrence,
  input: RecurrenceInput | RecurrenceUpdateInput,
) => {
  if (input.accountId !== undefined) recurrence.accountId = input.accountId
  if (input.categoryId !== undefined) recurrence.categoryId = input.categoryId
  if (input.subCategoryId !== undefined) recurrence.subCategoryId = input.subCategoryId
  if (input.description !== undefined) recurrence.description = input.description
  if (input.amount !== undefined) recurrence.amount = input.amount
  if (input.isActive !== undefined) recurrence.isActive = input.isActive
  if (input.chargeDate !== undefined) recurrence.chargeDate = input.chargeDate
  if (input.startDate !== undefined) recurrence.startDate = input.startDate
  if (input.endDate !== undefined) recurrence.endDate = input.endDate
}

const applyTransactionFieldsFromRecurrence = async (
  recurrenceId: string,
  input: RecurrenceUpdateInput,
) => {
  const transactions = await transactionsCollection()
    .query(Q.where('recurrence_id', recurrenceId))
    .fetch()

  if (transactions.length === 0) return

  const nextValues = {
    amount: input.amount,
    description: input.description,
    categoryId: input.categoryId,
    subCategoryId: input.subCategoryId,
  }

  await database.batch(
    ...transactions
      .filter((transaction) => transaction.status !== ('COMPLETED' as TransactionStatus))
      .map((transaction) =>
        transaction.prepareUpdate((record) => {
          if (nextValues.amount !== undefined) record.amount = nextValues.amount
          if (nextValues.description !== undefined) record.description = nextValues.description
          if (nextValues.categoryId !== undefined) record.categoryId = nextValues.categoryId
          if (nextValues.subCategoryId !== undefined) record.subcategoryId = nextValues.subCategoryId
        }),
      ),
  )
}

export const getRecurrenceById = async (id: string) => recurrencesCollection().find(id)

export const getAllRecurrences = async () => {
  return recurrencesCollection().query(Q.sortBy('created_at', 'desc')).fetch()
}

export const getRecurrencesByFilters = async (filters: {
  accountId?: string
  categoryId?: string
  isActive?: boolean
}) => {
  const conditions = []

  if (filters.accountId) conditions.push(Q.where('account_id', filters.accountId))
  if (filters.categoryId) conditions.push(Q.where('category_id', filters.categoryId))
  if (filters.isActive !== undefined) conditions.push(Q.where('is_active', filters.isActive))

  return recurrencesCollection().query(...conditions, Q.sortBy('created_at', 'desc')).fetch()
}

export const createRecurrence = async (input: RecurrenceInput) => {
  return database.write(async () => {
    return recurrencesCollection().create((recurrence) => {
      applyRecurrenceFields(recurrence, { isActive: true, ...input })
    })
  })
}

export const updateRecurrence = async (id: string, input: RecurrenceUpdateInput) => {
  return database.write(async () => {
    const recurrence = await getRecurrenceById(id)
    return recurrence.update((record) => {
      applyRecurrenceFields(record, input)
    })
  })
}

export const updateRecurrenceWithScope = async (
  id: string,
  input: RecurrenceUpdateInput,
  scope: RecurrenceUpdateScope = 'upcoming',
) => {
  return database.write(async () => {
    const recurrence = await getRecurrenceById(id)
    const updated = await recurrence.update((record) => {
      applyRecurrenceFields(record, input)
    })

    if (scope === 'all') {
      await applyTransactionFieldsFromRecurrence(id, input)
    }

    return updated
  })
}

export const markRecurrenceAsDeleted = async (id: string) => {
  return database.write(async () => {
    const recurrence = await getRecurrenceById(id)
    await recurrence.markAsDeleted()
  })
}

export const markRecurrenceAsDeletedWithScope = async (
  id: string,
  scope: RecurrenceDeleteScope = 'keep',
) => {
  return database.write(async () => {
    const [transactions, recurrence] = await Promise.all([
      transactionsCollection().query(Q.where('recurrence_id', id)).fetch(),
      getRecurrenceById(id),
    ])

    if (scope === 'remove') {
      await database.batch(
        ...transactions.map((transaction) => transaction.prepareMarkAsDeleted()),
        recurrence.prepareMarkAsDeleted(),
      )
      return
    }

    await database.batch(
      ...transactions.map((transaction) =>
        transaction.prepareUpdate((record) => {
          record.recurrenceId = null
        }),
      ),
      recurrence.prepareMarkAsDeleted(),
    )
  })
}

export const recurrenceQueries = {
  table: RECURRENCES_TABLE,
  getById: getRecurrenceById,
  getAll: getAllRecurrences,
  getByFilters: getRecurrencesByFilters,
  create: createRecurrence,
  update: updateRecurrence,
  updateWithScope: updateRecurrenceWithScope,
  markAsDeleted: markRecurrenceAsDeleted,
  markAsDeletedWithScope: markRecurrenceAsDeletedWithScope,
  delete: markRecurrenceAsDeleted,
}
