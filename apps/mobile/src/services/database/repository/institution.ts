import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Institution } from '../models/institution'

const INSTITUTIONS_TABLE = 'institutions'

const institutionsCollection = () => database.get<Institution>(INSTITUTIONS_TABLE)

export type InstitutionInput = {
  name: string
  color: string
  icon?: string | null
  logoUrl?: string | null
  userId?: string | null
}

export type InstitutionUpdateInput = Partial<InstitutionInput>

const applyInstitutionFields = (
  institution: Institution,
  input: InstitutionInput | InstitutionUpdateInput,
) => {
  if (input.name !== undefined) institution.name = input.name
  if (input.color !== undefined) institution.color = input.color
  if (input.icon !== undefined) institution.icon = input.icon
  if (input.logoUrl !== undefined) institution.logoUrl = input.logoUrl
  if (input.userId !== undefined) institution.userId = input.userId
}

export const getAllInstitutions = async () => {
  return institutionsCollection().query().fetch()
}

export const getInstitutionById = async (id: string) => {
  return institutionsCollection().find(id)
}

export const getInstitutionsCount = async () => {
  return institutionsCollection().query().fetchCount()
}

export const getInstitutionAccountsCount = async (id: string) => {
  return database.get('accounts').query(Q.where('institution_id', id)).fetchCount()
}

export const createInstitution = async (input: InstitutionInput) => {
  return database.write(async () => {
    return institutionsCollection().create((institution) => {
      applyInstitutionFields(institution, input)
    })
  })
}

export const updateInstitution = async (id: string, input: InstitutionUpdateInput) => {
  return database.write(async () => {
    const institution = await getInstitutionById(id)

    return institution.update((record) => {
      applyInstitutionFields(record, input)
    })
  })
}

export const markInstitutionAsDeleted = async (id: string) => {
  return database.write(async () => {
    const accounts = await database.get('accounts').query(Q.where('institution_id', id)).fetch()
    const accountIds = accounts.map((account) => account.id)

    const [invoices, recurrences, transactions, institution] = await Promise.all([
      accountIds.length
        ? database
            .get('invoices')
            .query(Q.where('account_id', Q.oneOf(accountIds)))
            .fetch()
        : Promise.resolve([]),
      accountIds.length
        ? database
            .get('recurrences')
            .query(Q.where('account_id', Q.oneOf(accountIds)))
            .fetch()
        : Promise.resolve([]),
      accountIds.length
        ? database
            .get('transactions')
            .query(
              Q.or(
                Q.where('account_id', Q.oneOf(accountIds)),
                Q.where('destination_account_id', Q.oneOf(accountIds)),
              ),
            )
            .fetch()
        : Promise.resolve([]),
      getInstitutionById(id),
    ])

    await database.batch([
      ...transactions.map((record) => record.prepareMarkAsDeleted()),
      ...recurrences.map((record) => record.prepareMarkAsDeleted()),
      ...invoices.map((record) => record.prepareMarkAsDeleted()),
      ...accounts.map((record) => record.prepareMarkAsDeleted()),
      institution.prepareMarkAsDeleted(),
    ])
  })
}

export const institutionQueries = {
  table: INSTITUTIONS_TABLE,
  getAll: getAllInstitutions,
  getById: getInstitutionById,
  getCount: getInstitutionsCount,
  getAccountsCount: getInstitutionAccountsCount,
  create: createInstitution,
  update: updateInstitution,
  delete: markInstitutionAsDeleted,
  markAsDeleted: markInstitutionAsDeleted,
}
