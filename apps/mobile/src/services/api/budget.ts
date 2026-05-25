import { api } from './axios-client'
import { BudgetListItem } from 'types/types'

export interface CreateBudgetDTO {
  name: string
  amountLimit: number
  month: number
  year: number
  categoryId?: string
}

export const BudgetService = {
  getAll: () => api.get<BudgetListItem[]>('/budget'),

  getById: (id: string) =>
    api.get(`/budget/${id}`),

  create: (data: CreateBudgetDTO) =>
    api.post('/budget', data),

  update: (
    id: string,
    data: Partial<CreateBudgetDTO>,
  ) =>
    api.patch(`/budget/${id}`, data),

  delete: (id: string) =>
    api.delete(`/budget/${id}`),
}