import { api } from './axios-client'
import { BudgetData, CategoryData } from 'types/types'

export const createBudget = async (budgetData: BudgetData): Promise<BudgetData> => {
  try {
    const response = await api.post('/budgets', budgetData)
    return response.data
  } catch (error) {
    console.error('Erro ao criar o budget:', error)
    throw error
  }
}

export const getCategories = async (): Promise<CategoryData[]> => {
  const response = await api.get('/categories')
  return response.data
}
