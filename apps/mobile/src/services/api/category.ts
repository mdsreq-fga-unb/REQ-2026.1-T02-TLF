import { api } from './axios-client'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'

export type CategoryDTO = {
  id: string
  name: string
  icon: string
  color: string
}

export type CreateCategoryDTO = {
  name: string
  icon: string
  color: string
}

export async function getCategories() {
  try {
    const response = await api.get<CategoryDTO[]>('/category')
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possivel carregar a(s) categoria(s)'))
  }
}

export async function createCategory(payload: CreateCategoryDTO) {
  try {
    const response = await api.post('/category', payload)
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possivel cria a categoria'))
  }
}

export async function updateCategory(id: string, payload: CreateCategoryDTO) {
  try {
    const response = await api.patch(`/category/${id}`, payload)
    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possivel atualizar a categoria'))
  }
}

export async function deleteCategory(id: string) {
  try {
    await api.delete(`/category/${id}`)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possivel excluir a categoria'))
  }
}
