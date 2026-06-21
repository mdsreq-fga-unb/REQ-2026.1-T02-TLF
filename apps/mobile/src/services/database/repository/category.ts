import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Category } from '../models/category'

const CATEGORIES_TABLE = 'categories'

const categoriesCollection = () => database.get<Category>(CATEGORIES_TABLE)

export type CategoryInput = {
  name: string
  icon: string
  color: string
}

export type CategoryUpdateInput = Partial<CategoryInput>

const applyCategoryFields = (category: Category, input: CategoryInput | CategoryUpdateInput) => {
  if (input.name !== undefined) category.name = input.name
  if (input.icon !== undefined) category.icon = input.icon
  if (input.color !== undefined) category.color = input.color
}

export const getCategoryById = async (id: string) => categoriesCollection().find(id)

export const createCategory = async (input: CategoryInput) => {
  return database.write(async () => {
    return categoriesCollection().create((category) => {
      applyCategoryFields(category, input)
    })
  })
}

export const updateCategory = async (id: string, input: CategoryUpdateInput) => {
  return database.write(async () => {
    const category = await getCategoryById(id)
    return category.update((record) => {
      applyCategoryFields(record, input)
    })
  })
}

export const markCategoryAsDeleted = async (id: string) => {
  return database.write(async () => {
    const [subCategories, budgets, category] = await Promise.all([
      database.get('sub_categories').query(Q.where('category_id', id)).fetch(),
      database.get('budgets').query(Q.where('category_id', id)).fetch(),
      getCategoryById(id),
    ])

    await database.batch([
      ...subCategories.map((record) => record.prepareMarkAsDeleted()),
      ...budgets.map((record) => record.prepareMarkAsDeleted()),
      category.prepareMarkAsDeleted(),
    ])
  })
}

export const categoryQueries = {
  table: CATEGORIES_TABLE,
  getById: getCategoryById,
  create: createCategory,
  update: updateCategory,
  markAsDeleted: markCategoryAsDeleted,
  delete: markCategoryAsDeleted,
}
