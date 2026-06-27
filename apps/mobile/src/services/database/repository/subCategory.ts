import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { SubCategory } from '../models/subCategory'

const SUB_CATEGORIES_TABLE = 'sub_categories'

const subCategoriesCollection = () => database.get<SubCategory>(SUB_CATEGORIES_TABLE)

export const getAllSubCategories = async () => subCategoriesCollection().query().fetch()

export const getSubCategoriesByCategory = async (categoryId: string) =>
  subCategoriesCollection().query(Q.where('category_id', categoryId)).fetch()

export type SubCategoryInput = {
  categoryId: string
  name: string
  icon: string
  color: string
}

export type SubCategoryUpdateInput = Partial<SubCategoryInput>

const applySubCategoryFields = (
  subCategory: SubCategory,
  input: SubCategoryInput | SubCategoryUpdateInput,
) => {
  if (input.categoryId !== undefined) subCategory.categoryId = input.categoryId
  if (input.name !== undefined) subCategory.name = input.name
  if (input.icon !== undefined) subCategory.icon = input.icon
  if (input.color !== undefined) subCategory.color = input.color
}

export const getSubCategoryById = async (id: string) => subCategoriesCollection().find(id)

export const createSubCategory = async (input: SubCategoryInput) => {
  return database.write(async () => {
    return subCategoriesCollection().create((subCategory) => {
      applySubCategoryFields(subCategory, input)
    })
  })
}

export const updateSubCategory = async (id: string, input: SubCategoryUpdateInput) => {
  return database.write(async () => {
    const subCategory = await getSubCategoryById(id)
    return subCategory.update((record) => {
      applySubCategoryFields(record, input)
    })
  })
}

export const markSubCategoryAsDeleted = async (id: string) => {
  return database.write(async () => {
    const subCategory = await getSubCategoryById(id)
    await subCategory.markAsDeleted()
  })
}

export const subCategoryQueries = {
  table: SUB_CATEGORIES_TABLE,
  getAll: getAllSubCategories,
  getByCategory: getSubCategoriesByCategory,
  getById: getSubCategoryById,
  create: createSubCategory,
  update: updateSubCategory,
  markAsDeleted: markSubCategoryAsDeleted,
  delete: markSubCategoryAsDeleted,
}
