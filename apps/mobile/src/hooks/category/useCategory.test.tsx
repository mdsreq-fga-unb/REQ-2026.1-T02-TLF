import { act, renderHook, waitFor } from '@testing-library/react-native'
import { getCategories, createCategory, updateCategory } from '@/services/api/category'
import { useCategory } from './useCategory'

jest.mock('@/services/api/category', () => ({
  getCategories: jest.fn(),
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
}))

jest.mock('expo-router', () => {
  const React = require('react')

  return {
    router: { back: jest.fn() },
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

const mockedGetCategories = jest.mocked(getCategories)
const mockedCreateCategory = jest.mocked(createCategory)
const mockedUpdateCategory = jest.mocked(updateCategory)

describe('useCategory hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedGetCategories.mockResolvedValue([])
    mockedCreateCategory.mockResolvedValue(undefined as never)
    mockedUpdateCategory.mockResolvedValue(undefined as never)
  })

  it('returns default values', async () => {
    const { result } = renderHook(() => useCategory())

    await waitFor(() => {
      expect(mockedGetCategories).toHaveBeenCalledTimes(1)
    })

    expect(result.current.categoryColor).toBe('#ff0000')
    expect(result.current.icon).toBe('heart')
    expect(result.current.name).toBe('')
    expect(result.current.iconComponent).toBeDefined()
  })

  it('updates values when setters are called', async () => {
    const { result } = renderHook(() => useCategory())

    await waitFor(() => {
      expect(mockedGetCategories).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.setCategoryColor('#123456')
      result.current.setIcon('storefront')
      result.current.setName('Teste')
    })

    expect(result.current.categoryColor).toBe('#123456')
    expect(result.current.icon).toBe('storefront')
    expect(result.current.name).toBe('Teste')
    expect(result.current.iconComponent).toBeDefined()
  })

  it('renders an icon component when available', async () => {
    const { result } = renderHook(() => useCategory())

    await waitFor(() => {
      expect(mockedGetCategories).toHaveBeenCalledTimes(1)
    })

    expect(result.current.iconComponent).toBeDefined()

    act(() => {
      result.current.setIcon('storefront')
    })

    expect(result.current.iconComponent).toBeDefined()
  })
})