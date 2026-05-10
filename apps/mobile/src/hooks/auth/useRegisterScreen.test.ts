import { renderHook, act } from '@testing-library/react-native'
import { register as registerUser } from '@/services/api/auth'
import { useAuthStore } from '@/stores/auth'
import { router } from 'expo-router'
import { Alert } from 'react-native'
import { useRegisterScreen } from './useRegisterScreen'

jest.mock('@/services/api/auth')
jest.mock('expo-router', () => ({
  router: { replace: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => false) },
}))

const mockedRegister = jest.mocked(registerUser)
const mockedReplace = jest.mocked(router.replace)

describe('useRegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  })

  function fillValidForm(result: { current: ReturnType<typeof useRegisterScreen> }) {
    act(() => {
      result.current.setName('Maria Silva')
      result.current.setEmail('maria@example.com')
      result.current.setPassword('Password123')
      result.current.setPasswordConfirm('Password123')
    })
  }

  it('starts invalid', () => {
    const { result } = renderHook(() => useRegisterScreen())
    expect(result.current.isFormValid).toBe(false)
  })

  it('isFormValid when all fields satisfy rules', () => {
    const { result } = renderHook(() => useRegisterScreen())
    fillValidForm(result)
    expect(result.current.nameErrorMessage).toBe('')
    expect(result.current.emailErrorMessage).toBe('')
    expect(result.current.passwordErrorMessage).toBe('')
    expect(result.current.passwordConfirmErrorMessage).toBe('')
    expect(result.current.isFormValid).toBe(true)
  })

  it('does not submit when invalid', async () => {
    const { result } = renderHook(() => useRegisterScreen())
    await act(async () => {
      await result.current.submit()
    })
    expect(mockedRegister).not.toHaveBeenCalled()
  })

  it('calls register, sets session, and replaces to tabs on success', async () => {
    mockedRegister.mockResolvedValue({
      user: {
        id: 'id-1',
        name: 'Maria Silva',
        email: 'maria@example.com',
      },
      accessToken: 'at',
      refreshToken: 'rt',
    })

    const { result } = renderHook(() => useRegisterScreen())
    fillValidForm(result)

    await act(async () => {
      await result.current.submit()
    })

    expect(mockedRegister).toHaveBeenCalledWith({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: 'Password123',
    })
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.email).toBe('maria@example.com')
    expect(mockedReplace).toHaveBeenCalledWith('/(tabs)')
  })

  it('shows alert on register failure', async () => {
    mockedRegister.mockRejectedValue(new Error('E-mail já cadastrado'))

    const { result } = renderHook(() => useRegisterScreen())
    fillValidForm(result)

    await act(async () => {
      await result.current.submit()
    })

    expect(Alert.alert).toHaveBeenCalledWith('Erro ao cadastrar', 'E-mail já cadastrado')
    expect(mockedReplace).not.toHaveBeenCalled()
  })
})
