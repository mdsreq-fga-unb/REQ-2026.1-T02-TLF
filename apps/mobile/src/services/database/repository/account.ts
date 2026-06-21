import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Account, AccountType, Currency } from '../models/account'

const ACCOUNTS_TABLE = 'accounts'

const accountsCollection = () => database.get<Account>(ACCOUNTS_TABLE)

export type AccountInput = {
  institutionId: string
  name: string
  type?: AccountType
  balance?: number
  closingDay?: number | null
  dueDay?: number | null
  creditLimit?: number | null
  currency?: Currency
  isActive?: boolean
}

export type AccountUpdateInput = Partial<AccountInput>

const applyAccountFields = (account: Account, input: AccountInput | AccountUpdateInput) => {
  if (input.institutionId !== undefined) account.institutionId = input.institutionId
  if (input.name !== undefined) account.name = input.name
  if (input.type !== undefined) account.type = input.type
  if (input.balance !== undefined) account.balance = input.balance
  if (input.closingDay !== undefined) account.closingDay = input.closingDay
  if (input.dueDay !== undefined) account.dueDay = input.dueDay
  if (input.creditLimit !== undefined) account.creditLimit = input.creditLimit
  if (input.currency !== undefined) account.currency = input.currency
  if (input.isActive !== undefined) account.isActive = input.isActive
}

export const getAccountById = async (id: string) => accountsCollection().find(id)

export const createAccount = async (input: AccountInput) => {
  return database.write(async () => {
    return accountsCollection().create((account) => {
      applyAccountFields(account, {
        type: input.type ?? 'CHECKING',
        balance: input.balance ?? 0,
        currency: input.currency ?? 'BRL',
        isActive: input.isActive ?? true,
        ...input,
      })
    })
  })
}

export const updateAccount = async (id: string, input: AccountUpdateInput) => {
  return database.write(async () => {
    const account = await getAccountById(id)
    return account.update((record) => {
      applyAccountFields(record, input)
    })
  })
}

export const markAccountAsDeleted = async (id: string) => {
  return database.write(async () => {
    const [invoices, recurrences, account] = await Promise.all([
      database.get('invoices').query(Q.where('account_id', id)).fetch(),
      database.get('recurrences').query(Q.where('account_id', id)).fetch(),
      getAccountById(id),
    ])

    await database.batch([
      ...recurrences.map((record) => record.prepareMarkAsDeleted()),
      ...invoices.map((record) => record.prepareMarkAsDeleted()),
      account.prepareMarkAsDeleted(),
    ])
  })
}

export const accountQueries = {
  table: ACCOUNTS_TABLE,
  getById: getAccountById,
  create: createAccount,
  update: updateAccount,
  markAsDeleted: markAccountAsDeleted,
  delete: markAccountAsDeleted,
}
