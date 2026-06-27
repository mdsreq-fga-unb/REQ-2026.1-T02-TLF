import { api } from './axios-client'

export type RecurrenceApiRef = {
  id: string
  name: string
}

export type RecurrenceApiItem = {
  id: string
  description: string
  amount: number
  chargeDate: number
  startDate: string
  endDate?: string | null
  isActive: boolean
  category?: RecurrenceApiRef
  institution: RecurrenceApiRef
}

export type RecurrenceApiDetail = RecurrenceApiItem & {
  subCategory?: RecurrenceApiRef
}

export type RecurrenceListMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type RecurrenceCreatePayload = {
  institutionId: string
  categoryId: string
  subCategoryId?: string
  description: string
  amount: number
  chargeDate: number
  startDate: string
  endDate?: string
  isActive?: boolean
}

export type RecurrenceUpdatePayload = Partial<RecurrenceCreatePayload> & {
  applyScope?: RecurrenceApplyScope
}

export enum RecurrenceApplyScope {
  THIS = 'THIS',
  ALL = 'ALL',
  FUTURE = 'FUTURE',
}

export enum RecurrenceDeleteScope {
  THIS = 'THIS',
  FUTURE = 'FUTURE',
  ALL = 'ALL',
}

export type RecurrenceListFilters = {
  categoryId?: string
  page?: number
  limit?: number
}

const unwrapListResponse = (
  payload: unknown,
): { data: RecurrenceApiItem[]; meta?: RecurrenceListMeta } => {
  if (Array.isArray(payload)) return { data: payload as RecurrenceApiItem[] }

  if (payload && typeof payload === 'object') {
    const data = (payload as { data?: unknown }).data
    const meta = (payload as { meta?: RecurrenceListMeta }).meta

    if (Array.isArray(data)) return { data: data as RecurrenceApiItem[], meta }
  }

  return { data: [] }
}

export const listRecurrences = async (filters?: RecurrenceListFilters) => {
  const response = await api.get('/recurrences', { params: filters })
  return unwrapListResponse(response.data)
}

export const getRecurrenceById = async (id: string) => {
  const response = await api.get(`/recurrences/${id}`)
  return response.data as RecurrenceApiDetail
}

export const createRecurrence = async (payload: RecurrenceCreatePayload) => {
  const response = await api.post('/recurrences', payload)
  return response.data as RecurrenceApiDetail
}

export const updateRecurrence = async (id: string, payload: RecurrenceUpdatePayload) => {
  const response = await api.patch(`/recurrences/${id}`, payload)
  return response.data as RecurrenceApiDetail
}

export const deleteRecurrence = async (id: string, scope?: RecurrenceDeleteScope) => {
  await api.delete(`/recurrences/${id}`, { params: scope ? { scope } : undefined })
}

export type RecurrenceConfirmResult = {
  id: string
  recurrenceId: string
  status: string
  amount: number
  date: string
  created: boolean
}

// Confirma a ocorrência do mês: o backend conclui a transação pendente existente
// (gerada pelo job mensal) ou cria uma nova, evitando duplicidade.
export const confirmRecurrence = async (id: string, referenceDate?: string) => {
  const response = await api.post(
    `/recurrences/${id}/confirm`,
    referenceDate ? { referenceDate } : {},
  )
  return response.data as RecurrenceConfirmResult
}

export type RecurrenceUnconfirmResult = {
  recurrenceId: string
  removed: boolean
  count: number
}

// Desfaz a confirmação do mês: remove a transação lançada para a recorrência.
export const unconfirmRecurrence = async (id: string, referenceDate?: string) => {
  const response = await api.post(
    `/recurrences/${id}/unconfirm`,
    referenceDate ? { referenceDate } : {},
  )
  return response.data as RecurrenceUnconfirmResult
}
