import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
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
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'amount', type: 'number' },
        { name: 'description', type: 'string' },
        { name: 'date', type: 'number' },
        { name: 'type', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'account_id', type: 'string' },
        { name: 'category_id', type: 'string' },
        { name: 'subcategory_id', type: 'string', isOptional: true },
        { name: 'invoice_id', type: 'string', isOptional: true },
        { name: 'recurrence_id', type: 'string', isOptional: true },
        { name: 'destination_account_id', type: 'string', isOptional: true },
        { name: 'installment_ref', type: 'string', isOptional: true },
        { name: 'installment_number', type: 'number', isOptional: true },
        { name: 'installment_total', type: 'number', isOptional: true },
        { name: 'receipt_url', type: 'string', isOptional: true },
        { name: 'external_id', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
})
