import { Database } from '@nozbe/watermelondb'
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import migrations from './migration'
import { Transaction } from './models/transaction'
import { Notification } from './models/notification'
import { Category } from './models/category'
import { SubCategory } from './models/subCategory'
import { Institution } from './models/institution'
import { Account } from './models/account'
import { Invoice } from './models/invoice'
import { Recurrence } from './models/recurrece'
import { Budget } from './models/budget'

const generateUuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16)
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

setGenerator(generateUuid)
const adapter = new SQLiteAdapter({
  schema,
  migrations,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error)
  },
})

export const database = new Database({
  adapter,
  modelClasses: [
    Category,
    SubCategory,
    Institution,
    Budget,
    Account,
    Invoice,
    Recurrence,
    Transaction,
    Notification,
  ],
})
