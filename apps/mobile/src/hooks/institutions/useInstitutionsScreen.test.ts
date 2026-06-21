import { renderHook, act } from '@testing-library/react-native'
import { router } from 'expo-router'
import { mockInstitutions } from '@/utils/fixtures/institutions'
import { useInstitutionsStore } from '@/stores/institutions'
import { useInstitutionsScreen } from './useInstitutionsScreen'

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
}))

jest.mock('@/services/api/institutions', () => ({
  listInstitutions: jest.fn(),
  deleteInstitution: jest.fn(),
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: { getAll: jest.fn(), delete: jest.fn() },
}))

const mockedPush = jest.mocked(router.push)

describe('useInstitutionsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useInstitutionsStore.setState({ institutions: [...mockInstitutions] })
  })

  describe('initial state', () => {
    it('should expose the institutions from the store without loading', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.institutions).toHaveLength(mockInstitutions.length)
      expect(result.current.confirmVisible).toBe(false)
      expect(result.current.blockedVisible).toBe(false)
    })
  })

  describe('search', () => {
    it('should filter institutions by name', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.setSearchQuery('nubank')
      })

      expect(result.current.institutions).toHaveLength(1)
      expect(result.current.institutions[0].name).toBe('Nubank')
    })

    it('should toggle the search and clear the query when closing', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

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
    it('should open an institution detail', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleOpen(mockInstitutions[0])
      })

      expect(mockedPush).toHaveBeenCalledWith({
        pathname: '/instituicao/[id]',
        params: {
          id: 'mock-inst-1',
          name: 'Nubank',
          color: '#820AD1',
          icon: 'landmark',
        },
      })
    })

    it('should navigate to the create screen', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleCreate()
      })

      expect(mockedPush).toHaveBeenCalledWith('/instituicao/nova')
    })
  })

  describe('delete', () => {
    it('should block deletion for institutions with linked accounts', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleDelete('mock-inst-1') // accountsCount: 2
      })

      expect(result.current.blockedVisible).toBe(true)
      expect(result.current.confirmVisible).toBe(false)
    })

    it('should open the confirmation for institutions without accounts', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleDelete('mock-inst-2') // accountsCount: 0
      })

      expect(result.current.confirmVisible).toBe(true)
      expect(result.current.blockedVisible).toBe(false)
    })

    it('should remove the institution from the store on confirm', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleDelete('mock-inst-2')
      })

      act(() => {
        result.current.confirmDelete()
      })

      expect(result.current.confirmVisible).toBe(false)
      expect(
        useInstitutionsStore.getState().institutions.find((item) => item.id === 'mock-inst-2'),
      ).toBeUndefined()
    })

    it('should cancel a pending deletion without removing anything', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleDelete('mock-inst-2')
      })

      act(() => {
        result.current.cancelDelete()
      })

      expect(result.current.confirmVisible).toBe(false)
      expect(useInstitutionsStore.getState().institutions).toHaveLength(mockInstitutions.length)
    })

    it('should dismiss the blocked modal', () => {
      const { result } = renderHook(() => useInstitutionsScreen())

      act(() => {
        result.current.handleDelete('mock-inst-1')
      })
      expect(result.current.blockedVisible).toBe(true)

      act(() => {
        result.current.dismissBlocked()
      })

      expect(result.current.blockedVisible).toBe(false)
    })
  })
})
