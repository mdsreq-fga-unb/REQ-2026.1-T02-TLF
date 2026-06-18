import { renderHook, act } from '@testing-library/react-native'
import { router } from 'expo-router'
import { useInstitutionForm } from './useInstitutionForm'

let mockParams: { color?: string; icon?: string } = {}

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), navigate: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => mockParams,
}))

const mockedPush = jest.mocked(router.push)

const defaultArgs = {
  initialName: '',
  initialColor: '#6E72FF',
  initialIcon: 'landmark' as const,
  returnTo: '/instituicao/nova',
}

describe('useInstitutionForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockParams = {}
  })

  describe('initial state', () => {
    it('should initialize with the provided values', () => {
      const { result } = renderHook(() =>
        useInstitutionForm({ ...defaultArgs, initialName: 'Nubank' }),
      )

      expect(result.current.name).toBe('Nubank')
      expect(result.current.color).toBe('#6E72FF')
      expect(result.current.icon).toBe('landmark')
      expect(result.current.nameError).toBeUndefined()
      expect(result.current.isFormValid).toBe(true)
    })

    it('should expose a placeholder preview name when name is empty', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      expect(result.current.previewName).toBe('Nome da Instituição')
      expect(result.current.isFormValid).toBe(false)
    })
  })

  describe('name validation', () => {
    it('should be invalid and set an error for an empty name', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      let isValid = true
      act(() => {
        isValid = result.current.validateName('')
      })

      expect(isValid).toBe(false)
      expect(result.current.nameError).toBe('Informe o nome da instituição.')
    })

    it('should be invalid for a whitespace-only name', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      let isValid = true
      act(() => {
        isValid = result.current.validateName('   ')
      })

      expect(isValid).toBe(false)
    })

    it('should be valid and clear the error for a non-empty name', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      act(() => {
        result.current.validateName('')
      })
      expect(result.current.nameError).toBe('Informe o nome da instituição.')

      let isValid = false
      act(() => {
        isValid = result.current.validateName('Itaú')
      })

      expect(isValid).toBe(true)
      expect(result.current.nameError).toBeUndefined()
    })
  })

  describe('name updates', () => {
    it('should update the name and derived values', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      act(() => {
        result.current.setName('  Inter  ')
      })

      expect(result.current.name).toBe('  Inter  ')
      expect(result.current.previewName).toBe('Inter')
      expect(result.current.isFormValid).toBe(true)
    })
  })

  describe('appearance params', () => {
    it('should apply the color returned by the appearance screen', () => {
      mockParams = { color: '#27FF97' }

      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      expect(result.current.color).toBe('#27FF97')
    })

    it('should apply the icon returned by the appearance screen', () => {
      mockParams = { icon: 'wallet' }

      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      expect(result.current.icon).toBe('wallet')
    })
  })

  describe('navigation', () => {
    it('should open the appearance screen with the current values', () => {
      const { result } = renderHook(() =>
        useInstitutionForm({ ...defaultArgs, initialName: 'Nubank' }),
      )

      act(() => {
        result.current.openAppearance()
      })

      expect(mockedPush).toHaveBeenCalledWith({
        pathname: '/instituicao/aparencia',
        params: {
          color: '#6E72FF',
          icon: 'landmark',
          name: 'Nubank',
          returnTo: '/instituicao/nova',
        },
      })
    })
  })

  describe('payload', () => {
    it('should build a payload with a trimmed name', () => {
      const { result } = renderHook(() => useInstitutionForm(defaultArgs))

      act(() => {
        result.current.setName('  Banco do Brasil  ')
      })

      expect(result.current.buildPayload()).toEqual({
        name: 'Banco do Brasil',
        color: '#6E72FF',
        icon: 'landmark',
      })
    })
  })
})
