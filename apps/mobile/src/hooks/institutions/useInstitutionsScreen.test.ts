import { act, renderHook, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { mockInstitutions } from '@/utils/fixtures/institutions'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionsStore } from '@/stores/institutions'
import { useInstitutionsScreen } from './useInstitutionsScreen'

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: {
    getAll: jest.fn(),
    getAccountsCount: jest.fn(),
    delete: jest.fn(),
  },
}))

const mockedPush = jest.mocked(router.push)
const mockedInstitutionQueries = jest.mocked(institutionQueries)

async function renderScreen() {
  const hook = renderHook(() => useInstitutionsScreen())

  await waitFor(() => {
    expect(hook.result.current.isLoading).toBe(false)
  })

  return hook
}

describe('useInstitutionsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useInstitutionsStore.setState({ institutions: [...mockInstitutions] })
    mockedInstitutionQueries.delete.mockResolvedValue(undefined)
  })

  describe('initial state', () => {
    it('should expose the institutions from the store without loading', async () => {
      const { result } = await renderScreen()

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.institutions).toHaveLength(mockInstitutions.length)
      expect(result.current.confirmVisible).toBe(false)
      expect(result.current.blockedVisible).toBe(false)
    })
  })

  describe('search', () => {
    it('should filter institutions by name', async () => {
      const { result } = await renderScreen()

      act(() => {
        result.current.setSearchQuery('nubank')
      })

      expect(result.current.institutions).toHaveLength(1)
      expect(result.current.institutions[0].name).toBe('Nubank')
    })

    it('should toggle the search and clear the query when closing', async () => {
      const { result } = await renderScreen()

      act(() => {
        result.current.toggleSearch()
      })
      expect(result.current.isSearchOpen).toBe(true)

      act(() => {
        result.current.setSearchQuery('xp')
      })
      expect(result.current.institutions).toHaveLength(1)

      act(() => {
        result.current.toggleSearch()
      })

      expect(result.current.isSearchOpen).toBe(false)
      expect(result.current.searchQuery).toBe('')
      expect(result.current.institutions).toHaveLength(mockInstitutions.length)
    })
  })

  describe('navigation', () => {
    it('should open an institution detail', async () => {
      const { result } = await renderScreen()

      act(() => {
        result.current.handleOpen(mockInstitutions[0])
      })

      expect(mockedPush).toHaveBeenCalledWith({
        pathname: '/instituicao/[id]',
        params: {
          id: mockInstitutions[0].id,
          name: 'Nubank',
          color: '#820AD1',
          icon: 'landmark',
        },
      })
    })

    it('should navigate to the create screen', async () => {
      const { result } = await renderScreen()

      act(() => {
        result.current.handleCreate()
      })

      expect(mockedPush).toHaveBeenCalledWith('/instituicao/nova')
    })
  })

  describe('delete', () => {
    it('should block deletion for institutions with linked accounts', async () => {
      const { result } = await renderScreen()

      await act(async () => {
        result.current.handleDelete(mockInstitutions[0].id)
      })

      await waitFor(() => {
        expect(result.current.blockedVisible).toBe(true)
        expect(result.current.confirmVisible).toBe(false)
      })
    })

    it('should open the confirmation for institutions without accounts', async () => {
      const { result } = await renderScreen()

      await act(async () => {
        result.current.handleDelete(mockInstitutions[1].id)
      })

      await waitFor(() => {
        expect(result.current.confirmVisible).toBe(true)
        expect(result.current.blockedVisible).toBe(false)
      })
    })

    it('should remove the institution from the store on confirm', async () => {
      const { result } = await renderScreen()

      await act(async () => {
        result.current.handleDelete(mockInstitutions[1].id)
      })

      await act(async () => {
        result.current.confirmDelete()
        await Promise.resolve()
      })

      await waitFor(() => {
        expect(result.current.confirmVisible).toBe(false)
      })

      expect(
        useInstitutionsStore
          .getState()
          .institutions.find((item) => item.id === mockInstitutions[1].id),
      ).toBeUndefined()
    })

    it('should cancel a pending deletion without removing anything', async () => {
      const { result } = await renderScreen()

      await act(async () => {
        result.current.handleDelete(mockInstitutions[1].id)
      })

      act(() => {
        result.current.cancelDelete()
      })

      expect(result.current.confirmVisible).toBe(false)
      expect(useInstitutionsStore.getState().institutions).toHaveLength(mockInstitutions.length)
    })

    it('should dismiss the blocked modal', async () => {
      const { result } = await renderScreen()

      await act(async () => {
        result.current.handleDelete(mockInstitutions[0].id)
      })

      await waitFor(() => {
        expect(result.current.blockedVisible).toBe(true)
      })

      act(() => {
        result.current.dismissBlocked()
      })

      expect(result.current.blockedVisible).toBe(false)
    })
  })
})
