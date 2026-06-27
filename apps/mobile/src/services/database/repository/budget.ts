import { database } from '..'
import { Budget } from '../models/budget'

const BUDGETS_TABLE = 'budgets'

const budgetsCollection = () => database.get<Budget>(BUDGETS_TABLE)

export type BudgetInput = {
  categoryId: string
  name: string
  amountLimit: number
  month: number
  year: number
}

export type BudgetUpdateInput = Partial<BudgetInput>

const applyBudgetFields = (budget: Budget, input: BudgetInput | BudgetUpdateInput) => {
  if (input.categoryId !== undefined) budget.categoryId = input.categoryId
  if (input.name !== undefined) budget.name = input.name
  if (input.amountLimit !== undefined) budget.amountLimit = input.amountLimit
  if (input.month !== undefined) budget.month = input.month
  if (input.year !== undefined) budget.year = input.year
}

export const getBudgetById = async (id: string) => budgetsCollection().find(id)

export const getAllBudgets = async () => budgetsCollection().query().fetch()

export const createBudget = async (input: BudgetInput) => {
  return database.write(async () => {
    return budgetsCollection().create((budget) => {
      applyBudgetFields(budget, input)
    })
  })
}

export const updateBudget = async (id: string, input: BudgetUpdateInput) => {
  return database.write(async () => {
    const budget = await getBudgetById(id)
    return budget.update((record) => {
      applyBudgetFields(record, input)
    })
  })
}

export const markBudgetAsDeleted = async (id: string) => {
  return database.write(async () => {
    const budget = await getBudgetById(id)
    await budget.markAsDeleted()
  })
}

export const budgetQueries = {
  table: BUDGETS_TABLE,

  getAll: getAllBudgets,
  getById: getBudgetById,
  create: createBudget,
  update: updateBudget,
  markAsDeleted: markBudgetAsDeleted,
  delete: markBudgetAsDeleted,
}
