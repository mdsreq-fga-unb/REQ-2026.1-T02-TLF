import { act, renderHook, waitFor } from '@testing-library/react-native'
import { categoryQueries } from '@/services/database/repository/category'
import { syncDatabase } from '@/services/database/sync'
import { useCategory } from './useCategory'

jest.mock('@/services/database/repository/category', () => ({
  categoryQueries: {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}))

jest.mock('@/services/database/sync', () => ({
  syncDatabase: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')

  return {
    router: { back: jest.fn() },
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

const mockedCategoryQueries = jest.mocked(categoryQueries)
const mockedSyncDatabase = jest.mocked(syncDatabase)

const categories = [{ id: 'cat-1', name: 'Moradia', icon: 'house', color: '#111111' }]

describe('useCategory hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedCategoryQueries.getAll.mockResolvedValue(categories as never)
    mockedCategoryQueries.create.mockResolvedValue(undefined as never)
    mockedCategoryQueries.update.mockResolvedValue(undefined as never)
    mockedSyncDatabase.mockResolvedValue(undefined)
  })

  it('loads categories from the local repository', async () => {
    const { result } = renderHook(() => useCategory())

    await waitFor(() => {
      expect(result.current.mappedCategories).toHaveLength(1)
    })

    expect(result.current.mappedCategories[0]).toMatchObject({
      id: 'cat-1',
      name: 'Moradia',
      icon: 'house',
      color: '#111111',
    })
  })

  it('updates values when setters are called', async () => {
    const { result } = renderHook(() => useCategory())

    await waitFor(() => {
      expect(result.current.mappedCategories).toHaveLength(1)
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
      expect(result.current.mappedCategories).toHaveLength(1)
    })

    expect(result.current.iconComponent).toBeDefined()

    act(() => {
      result.current.setIcon('storefront')
    })

    expect(result.current.iconComponent).toBeDefined()
  })
})
