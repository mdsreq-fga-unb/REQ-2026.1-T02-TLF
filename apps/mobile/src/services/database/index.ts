import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import { Transaction } from './models/transaction'
import { Notification } from './models/notification'
import { Category } from './models/category'
import { SubCategory } from './models/subCategory'
import { Institution } from './models/institution'
import { Account } from './models/account'
import { Invoice } from './models/invoice'
import { Recurrence } from './models/recurrece'
import { Budget } from './models/budget'
import migrations from './migration'

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
