import { renderHook, act } from '@testing-library/react-native'
import { router } from 'expo-router'
import { mockInstitutions } from '@/utils/fixtures/institutions'
import { useInstitutionsStore } from '@/stores/institutions'
import { useNovaInstituicao } from './useNovaInstituicao'

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({}),
}))

jest.mock('@/services/api/institutions', () => ({
  createInstitution: jest.fn(),
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: { create: jest.fn() },
}))

const mockedNavigate = jest.mocked(router.navigate)

describe('useNovaInstituicao', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    useInstitutionsStore.setState({ institutions: [...mockInstitutions] })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initial state', () => {
    it('should start empty and not saving', () => {
      const { result } = renderHook(() => useNovaInstituicao())

      expect(result.current.name).toBe('')
      expect(result.current.isSaving).toBe(false)
      expect(result.current.showSuccess).toBe(false)
      expect(result.current.isFormValid).toBe(false)
    })
  })

  describe('save', () => {
    it('should not save when the name is empty', async () => {
      const { result } = renderHook(() => useNovaInstituicao())

      await act(async () => {
        await result.current.handleSave()
      })

      expect(result.current.nameError).toBe('Informe o nome da instituição.')
      expect(result.current.showSuccess).toBe(false)
      expect(useInstitutionsStore.getState().institutions).toHaveLength(mockInstitutions.length)
    })

    it('should add the institution to the store and show success', async () => {
      const { result } = renderHook(() => useNovaInstituicao())

      act(() => {
        result.current.setName('Banco Inter')
      })

      await act(async () => {
        await result.current.handleSave()
      })

      const institutions = useInstitutionsStore.getState().institutions
      expect(institutions).toHaveLength(mockInstitutions.length + 1)
      expect(institutions[institutions.length - 1]).toMatchObject({
        name: 'Banco Inter',
        color: '#6E72FF',
        icon: 'landmark',
      })
      expect(result.current.showSuccess).toBe(true)
    })

    it('should navigate to the list after the success delay', async () => {
      const { result } = renderHook(() => useNovaInstituicao())

      act(() => {
        result.current.setName('Banco Inter')
      })

      await act(async () => {
        await result.current.handleSave()
      })

      expect(mockedNavigate).not.toHaveBeenCalled()

      act(() => {
        jest.runAllTimers()
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/institutions')
    })
  })

  describe('close', () => {
    it('should navigate back to the list', () => {
      const { result } = renderHook(() => useNovaInstituicao())

      act(() => {
        result.current.handleClose()
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/institutions')
    })
  })
})
