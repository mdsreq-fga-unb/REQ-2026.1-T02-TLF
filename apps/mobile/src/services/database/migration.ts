import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

// toVersion: 1 is the baseline schema.
// Fresh installs build directly from schema.ts — no migration steps needed.
// Add a { toVersion: 2, steps: [...] } block here when the schema changes.
export default schemaMigrations({
  migrations: [],
})
