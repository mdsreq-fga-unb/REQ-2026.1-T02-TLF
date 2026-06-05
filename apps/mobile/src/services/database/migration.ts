import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

// Migrations são obrigatórias antes de subir o app para evitar perda de dados
// em mudanças de schema.
export const migrations = schemaMigrations({
  migrations: [
    {
      // v1 → v2: adiciona a tabela de contas (sincronizada do backend). Tornar
      // transactions.category_id opcional é uma mudança só no schema JS (as
      // colunas do SQLite já são nuláveis), então não precisa de passo DDL.
      toVersion: 2,
      steps: [
        createTable({
          name: 'accounts',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'balance', type: 'number' },
            { name: 'currency', type: 'string' },
            { name: 'institution_id', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
      ],
    },
  ],
})
