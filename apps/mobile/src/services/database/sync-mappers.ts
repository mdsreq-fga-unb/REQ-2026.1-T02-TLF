type SyncRecord = Record<string, unknown>

type TableChanges = {
  created?: SyncRecord[]
  updated?: SyncRecord[]
  deleted?: string[]
}

type SyncChanges = Record<string, TableChanges | undefined>

type FieldDef = {
  local: string
  remote: string
  transform?: 'timestamp'
  pullOnly?: boolean
}

type TableDef = {
  fields: FieldDef[]
}

const timestampFields = new Set(['created_at', 'updated_at', 'date', 'start_date', 'end_date'])

// watermelonDB standard is use unix timestamp
const toTimestamp = (value: unknown): number | undefined => {
  if (value == null) return undefined
  if (typeof value === 'number') return value
  return new Date(String(value)).getTime()
}

// at database we use iso 8601
const toIso = (value: unknown): string | undefined => {
  if (value == null) return undefined
  if (typeof value === 'number') return new Date(value).toISOString()
  return String(value)
}

const TABLE_DEFS: Record<string, TableDef> = {
  categories: {
    fields: [
      { local: 'name', remote: 'name' },
      { local: 'icon', remote: 'icon' },
      { local: 'color', remote: 'color' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  sub_categories: {
    fields: [
      { local: 'category_id', remote: 'categoryId' },
      { local: 'name', remote: 'name' },
      { local: 'icon', remote: 'icon' },
      { local: 'color', remote: 'color' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  institutions: {
    fields: [
      { local: 'name', remote: 'name' },
      { local: 'color', remote: 'color' },
      { local: 'icon', remote: 'icon' },
      { local: 'logo_url', remote: 'logoUrl' },
      { local: 'user_id', remote: 'userId', pullOnly: true },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  budgets: {
    fields: [
      { local: 'category_id', remote: 'categoryId' },
      { local: 'name', remote: 'name' },
      { local: 'amount_limit', remote: 'amountLimit' },
      { local: 'month', remote: 'month' },
      { local: 'year', remote: 'year' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  accounts: {
    fields: [
      { local: 'institution_id', remote: 'institutionId' },
      { local: 'name', remote: 'name' },
      { local: 'type', remote: 'type' },
      { local: 'balance', remote: 'balance' },
      { local: 'closing_day', remote: 'closingDay' },
      { local: 'due_day', remote: 'dueDay' },
      { local: 'credit_limit', remote: 'creditLimit' },
      { local: 'currency', remote: 'currency' },
      { local: 'is_active', remote: 'isActive' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  invoices: {
    fields: [
      { local: 'account_id', remote: 'accountId' },
      { local: 'status', remote: 'status' },
      { local: 'payment_status', remote: 'paymentStatus' },
      { local: 'reference_month', remote: 'referenceMonth' },
      { local: 'reference_year', remote: 'referenceYear' },
      { local: 'total_amount', remote: 'totalAmount' },
      { local: 'paid_amount', remote: 'paidAmount' },
      { local: 'closing_day', remote: 'closingDay' },
      { local: 'due_day', remote: 'dueDay' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  recurrences: {
    fields: [
      { local: 'institution_id', remote: 'institutionId' },
      { local: 'category_id', remote: 'categoryId' },
      { local: 'sub_category_id', remote: 'subCategoryId' },
      { local: 'description', remote: 'description' },
      { local: 'amount', remote: 'amount' },
      { local: 'is_active', remote: 'isActive' },
      { local: 'charge_date', remote: 'chargeDate' },
      { local: 'start_date', remote: 'startDate', transform: 'timestamp' },
      { local: 'end_date', remote: 'endDate', transform: 'timestamp' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  transactions: {
    fields: [
      { local: 'institution_id', remote: 'institutionId' },
      { local: 'category_id', remote: 'categoryId' },
      { local: 'subcategory_id', remote: 'subCategoryId' },
      { local: 'type', remote: 'type' },
      { local: 'amount', remote: 'amount' },
      { local: 'description', remote: 'description' },
      { local: 'date', remote: 'date', transform: 'timestamp' },
      { local: 'status', remote: 'status' },
      { local: 'invoice_id', remote: 'invoiceId' },
      { local: 'recurrence_id', remote: 'recurrenceId' },
      { local: 'destination_institution_id', remote: 'destinationInstitutionId' },
      { local: 'installment_ref', remote: 'installmentReference' },
      { local: 'installment_number', remote: 'installmentNumber' },
      { local: 'installment_total', remote: 'installmentTotal' },
      { local: 'receipt_url', remote: 'receiptUrl' },
      { local: 'external_id', remote: 'externalId' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
  notifications: {
    fields: [
      { local: 'type', remote: 'type' },
      { local: 'title', remote: 'title' },
      { local: 'description', remote: 'description' },
      { local: 'is_read', remote: 'isRead' },
      { local: 'primary_action_label', remote: 'primaryActionLabel' },
      { local: 'primary_action', remote: 'primaryAction' },
      { local: 'secondary_action_label', remote: 'secondaryActionLabel' },
      { local: 'secondary_action', remote: 'secondaryAction' },
      { local: 'icon', remote: 'icon' },
      { local: 'color', remote: 'color' },
      { local: 'reference_id', remote: 'referenceId' },
      { local: 'reference_type', remote: 'referenceType' },
      { local: 'created_at', remote: 'createdAt', transform: 'timestamp' },
      { local: 'updated_at', remote: 'updatedAt', transform: 'timestamp' },
    ],
  },
}

const applyPullValue = (value: unknown, field: FieldDef): unknown => {
  if (field.transform === 'timestamp' || timestampFields.has(field.local)) {
    return toTimestamp(value)
  }
  return value
}

const applyPushValue = (value: unknown, field: FieldDef): unknown => {
  if (field.transform === 'timestamp' || timestampFields.has(field.local)) {
    return toIso(value)
  }
  return value
}

const mapPullRecord = (record: SyncRecord, tableDef: TableDef): SyncRecord => {
  const remoteIndex = Object.fromEntries(tableDef.fields.map((field) => [field.remote, field]))
  const result: SyncRecord = { id: record.id }

  for (const [key, value] of Object.entries(record)) {
    if (key === 'id') continue

    const field = remoteIndex[key]
    if (field) {
      result[field.local] = applyPullValue(value, field)
    } else {
      result[key] = value
    }
  }

  return result
}

const mapPushRecord = (record: SyncRecord, tableDef: TableDef): SyncRecord => {
  const localIndex = Object.fromEntries(tableDef.fields.map((field) => [field.local, field]))
  const result: SyncRecord = { id: record.id }

  for (const [key, value] of Object.entries(record)) {
    if (key === 'id' || key.startsWith('_')) continue

    const field = localIndex[key]
    if (!field || field.pullOnly) continue

    result[field.remote] = applyPushValue(value, field)
  }

  return result
}

const mapTableChanges = (
  changes: TableChanges | undefined,
  tableDef: TableDef,
  direction: 'pull' | 'push',
): TableChanges | undefined => {
  if (!changes) return undefined

  const mapRecord = direction === 'pull' ? mapPullRecord : mapPushRecord

  return {
    created: changes.created?.map((record) => mapRecord(record, tableDef)),
    updated: changes.updated?.map((record) => mapRecord(record, tableDef)),
    deleted: changes.deleted,
  }
}

export const mapPullChanges = (changes: SyncChanges): SyncChanges => {
  const mapped: SyncChanges = {}

  for (const [table, tableChanges] of Object.entries(changes)) {
    const tableDef = TABLE_DEFS[table]
    mapped[table] = tableDef ? mapTableChanges(tableChanges, tableDef, 'pull') : tableChanges
  }

  return mapped
}

export const mapPushChanges = (changes: SyncChanges): SyncChanges => {
  const mapped: SyncChanges = {}

  for (const [table, tableChanges] of Object.entries(changes)) {
    const tableDef = TABLE_DEFS[table]
    mapped[table] = tableDef ? mapTableChanges(tableChanges, tableDef, 'push') : tableChanges
  }

  return mapped
}
