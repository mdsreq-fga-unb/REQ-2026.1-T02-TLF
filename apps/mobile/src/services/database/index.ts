import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import { migrations } from './migration'
import { Transaction } from './models/transaction'
import { Institution } from './models/institution'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error)
  },
})

export const database = new Database({
  adapter,
  modelClasses: [Transaction, Institution],
})
