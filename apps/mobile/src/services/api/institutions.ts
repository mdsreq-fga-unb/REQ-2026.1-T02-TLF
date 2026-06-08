import { api } from './axios-client'

export type InstitutionApiItem = {
  id: string
  name: string
  color: string
  logoUrl?: string | null
  icon?: string
}

export type InstitutionCreatePayload = {
  name: string
  color: string
  logoUrl?: string | null
  icon?: string
}

export type InstitutionUpdatePayload = Partial<InstitutionCreatePayload>

const unwrapListResponse = (payload: unknown): InstitutionApiItem[] => {
  if (Array.isArray(payload)) return payload as InstitutionApiItem[]

  if (payload && typeof payload === 'object') {
    const data = (payload as { data?: unknown }).data
    const institutions = (payload as { institutions?: unknown }).institutions

    if (Array.isArray(data)) return data as InstitutionApiItem[]
    if (Array.isArray(institutions)) return institutions as InstitutionApiItem[]
  }

  return []
}

export const listInstitutions = async () => {
  const response = await api.get('/institution')
  return unwrapListResponse(response.data)
}

export const getInstitutionById = async (id: string) => {
  const response = await api.get(`/institution/${id}`)
  return response.data as InstitutionApiItem
}

export const createInstitution = async (payload: InstitutionCreatePayload) => {
  const response = await api.post('/institution', payload)
  return response.data as InstitutionApiItem
}

export const updateInstitution = async (id: string, payload: InstitutionUpdatePayload) => {
  const response = await api.patch(`/institution/${id}`, payload)
  return response.data as InstitutionApiItem
}

export const deleteInstitution = async (id: string) => {
  await api.delete(`/institution/${id}`)
}
