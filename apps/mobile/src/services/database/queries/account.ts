import { database } from '..'
import { Account } from '../models/account'

const ACCOUNTS_TABLE = 'accounts'

const accountsCollection = () => database.get<Account>(ACCOUNTS_TABLE)

export const getAllAccounts = async () => {
  return accountsCollection().query().fetch()
}

export const observeAccounts = () => {
  return accountsCollection().query().observe()
}

export const getAccountsCount = async () => {
  return accountsCollection().query().fetchCount()
}

export const accountQueries = {
  table: ACCOUNTS_TABLE,
  getAll: getAllAccounts,
  observe: observeAccounts,
  getCount: getAccountsCount,
}
