import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'institutions',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'color', type: 'string' },
            { name: 'icon', type: 'string', isOptional: true },
            { name: 'logo_url', type: 'string', isOptional: true },
            { name: 'user_id', type: 'string', isOptional: true },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
      ],
    },
  ],
})
