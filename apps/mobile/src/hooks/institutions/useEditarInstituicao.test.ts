import { renderHook, act } from '@testing-library/react-native'
import { router } from 'expo-router'
import { mockInstitutions } from '@/utils/fixtures/institutions'
import { useInstitutionsStore } from '@/stores/institutions'
import { useEditarInstituicao } from './useEditarInstituicao'

let mockParams: {
  id?: string
  name?: string
  color?: string
  icon?: string
} = {}

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => mockParams,
}))

jest.mock('@/services/api/institutions', () => ({
  updateInstitution: jest.fn(),
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: { update: jest.fn() },
}))

const mockedNavigate = jest.mocked(router.navigate)

describe('useEditarInstituicao', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockParams = {
      id: mockInstitutions[0].id,
      name: 'Nubank',
      color: '#820AD1',
      icon: 'landmark',
    }
    useInstitutionsStore.setState({ institutions: [...mockInstitutions] })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initial state', () => {
    it('should initialize the form from the route params', () => {
      const { result } = renderHook(() => useEditarInstituicao())

      expect(result.current.name).toBe('Nubank')
      expect(result.current.color).toBe('#820AD1')
      expect(result.current.icon).toBe('landmark')
      expect(result.current.isFormValid).toBe(true)
    })
  })

  describe('save', () => {
    it('should not save when the name is cleared', async () => {
      const { result } = renderHook(() => useEditarInstituicao())

      act(() => {
        result.current.setName('')
      })

      await act(async () => {
        await result.current.handleSave()
      })

      expect(result.current.nameError).toBe('Informe o nome da instituição.')
      expect(result.current.showSuccess).toBe(false)
    })

    it('should update the institution in the store and show success', async () => {
      const { result } = renderHook(() => useEditarInstituicao())

      act(() => {
        result.current.setName('Nubank Ultravioleta')
      })

      await act(async () => {
        await result.current.handleSave()
      })

      const updated = useInstitutionsStore
        .getState()
        .institutions.find((item) => item.id === mockInstitutions[0].id)

      expect(updated?.name).toBe('Nubank Ultravioleta')
      expect(result.current.showSuccess).toBe(true)
    })

    it('should navigate to the list after the success delay', async () => {
      const { result } = renderHook(() => useEditarInstituicao())

      await act(async () => {
        await result.current.handleSave()
      })

      act(() => {
        jest.runAllTimers()
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/institutions')
    })
  })

  describe('close', () => {
    it('should navigate back to the list', () => {
      const { result } = renderHook(() => useEditarInstituicao())

      act(() => {
        result.current.handleClose()
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/institutions')
    })
  })
})
