import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import { Transaction } from './models/transaction'

const adapter = new SQLiteAdapter({
  schema,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error)
  },
})

export const database = new Database({
  adapter,
  modelClasses: [Transaction],
})
