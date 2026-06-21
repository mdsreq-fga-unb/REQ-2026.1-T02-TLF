import { schemaMigrations, addColumns } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'transactions',
          columns: [
            { name: 'institution_id', type: 'string', isIndexed: true },
            {
              name: 'destination_institution_id',
              type: 'string',
              isOptional: true,
              isIndexed: true,
            },
          ],
        }),
        {
          type: 'sql',
          sql: `
            UPDATE transactions
            SET institution_id = (
              SELECT institution_id
              FROM accounts
              WHERE accounts.id = transactions.account_id
            )
            WHERE institution_id IS NULL OR institution_id = '';

            UPDATE transactions
            SET destination_institution_id = (
              SELECT institution_id
              FROM accounts
              WHERE accounts.id = transactions.destination_account_id
            )
            WHERE destination_account_id IS NOT NULL;
          `,
        },
      ],
    },
  ],
})
