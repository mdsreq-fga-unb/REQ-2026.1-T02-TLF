import { renderHook, act } from '@testing-library/react-native'
import { login } from '@/services/api/auth'
import { useAuthStore } from '@/stores/auth'
import { router } from 'expo-router'
import { useLoginScreen } from './useLoginScreen'

jest.mock('@/services/api/auth')
jest.mock('@/services/api/token-storage', () => ({
  getUser: jest.fn().mockResolvedValue(null),
}))
jest.mock('@/services/notification/notification-checker', () => ({
  runNotificationChecks: jest.fn().mockResolvedValue(undefined),
}))
jest.mock('expo-router', () => ({
  router: { replace: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => false) },
}))

const mockedLogin = jest.mocked(login)
const mockedReplace = jest.mocked(router.replace)

describe('useLoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  })

  it('starts invalid and empty', () => {
    const { result } = renderHook(() => useLoginScreen())
    expect(result.current.isFormValid).toBe(false)
    expect(result.current.email).toBe('')
    expect(result.current.password).toBe('')
    expect(result.current.isSubmitting).toBe(false)
  })

  it('isFormValid is true with valid email and password', () => {
    const { result } = renderHook(() => useLoginScreen())
    act(() => {
      result.current.setEmail('a@b.co')
      result.current.setPassword('abcdefgh')
    })
    expect(result.current.emailErrorMessage).toBe('')
    expect(result.current.passwordErrorMessage).toBe('')
    expect(result.current.isFormValid).toBe(true)
  })

  it('does not call login when form is invalid', async () => {
    const { result } = renderHook(() => useLoginScreen())
    await act(async () => {
      await result.current.submit()
    })
    expect(mockedLogin).not.toHaveBeenCalled()
  })

  it('calls login, sets session, and navigates on success', async () => {
    mockedLogin.mockResolvedValue({
      user: { id: '1', name: 'Test', email: 'a@b.co' },
      accessToken: 'at',
      refreshToken: 'rt',
    })

    const { result } = renderHook(() => useLoginScreen())
    act(() => {
      result.current.setEmail('a@b.co')
      result.current.setPassword('abcdefgh')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(mockedLogin).toHaveBeenCalledWith('a@b.co', 'abcdefgh')
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.email).toBe('a@b.co')
    expect(mockedReplace).toHaveBeenCalledWith('/(tabs)')
  })

  it('shows alert and does not navigate on login failure', async () => {
    mockedLogin.mockRejectedValue(new Error('Credenciais inválidas'))

    const { result } = renderHook(() => useLoginScreen())
    act(() => {
      result.current.setEmail('a@b.co')
      result.current.setPassword('abcdefgh')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.feedbackMessage).toBe('Credenciais inválidas')
    expect(mockedReplace).not.toHaveBeenCalled()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
