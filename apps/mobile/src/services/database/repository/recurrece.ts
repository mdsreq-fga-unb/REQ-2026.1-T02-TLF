import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Recurrence } from '../models/recurrece'

const RECURRENCES_TABLE = 'recurrences'

const recurrencesCollection = () => database.get<Recurrence>(RECURRENCES_TABLE)

export type RecurrenceInput = {
  institutionId: string
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

const applyRecurrenceFields = (
  recurrence: Recurrence,
  input: RecurrenceInput | RecurrenceUpdateInput,
) => {
  if (input.institutionId !== undefined) recurrence.institutionId = input.institutionId
  if (input.categoryId !== undefined) recurrence.categoryId = input.categoryId
  if (input.subCategoryId !== undefined) recurrence.subCategoryId = input.subCategoryId
  if (input.description !== undefined) recurrence.description = input.description
  if (input.amount !== undefined) recurrence.amount = input.amount
  if (input.isActive !== undefined) recurrence.isActive = input.isActive
  if (input.chargeDate !== undefined) recurrence.chargeDate = input.chargeDate
  if (input.startDate !== undefined) recurrence.startDate = input.startDate
  if (input.endDate !== undefined) recurrence.endDate = input.endDate
}

export const getRecurrenceById = async (id: string) => recurrencesCollection().find(id)

export const getAllRecurrences = async () => recurrencesCollection().query().fetch()

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

export const markRecurrenceAsDeleted = async (id: string) => {
  return database.write(async () => {
    const recurrence = await getRecurrenceById(id)
    const linkedTransactions = await database
      .get('transactions')
      .query(Q.where('recurrence_id', id))
      .fetch()

    await database.batch([
      ...linkedTransactions.map((record) => record.prepareMarkAsDeleted()),
      recurrence.prepareMarkAsDeleted(),
    ])
  })
}

export const recurrenceQueries = {
  table: RECURRENCES_TABLE,

  getAll: getAllRecurrences,
  getById: getRecurrenceById,
  create: createRecurrence,
  update: updateRecurrence,
  markAsDeleted: markRecurrenceAsDeleted,
  delete: markRecurrenceAsDeleted,
}
