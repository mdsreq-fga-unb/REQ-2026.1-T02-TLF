import { register as registerUser } from '@/services/api/auth'
import { useAuthStore } from '@/stores/auth'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import {
  getEmailError,
  getNameError,
  getPasswordConfirmError,
  getRegisterPasswordError,
} from '@/utils/authValidation'

export function useRegisterScreen() {
  const setSession = useAuthStore((s) => s.setSession)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nameErrorMessage = useMemo(() => getNameError(name), [name])
  const emailErrorMessage = useMemo(() => getEmailError(email), [email])
  const passwordErrorMessage = useMemo(() => getRegisterPasswordError(password), [password])
  const passwordConfirmErrorMessage = useMemo(
    () => getPasswordConfirmError(password, passwordConfirm),
    [password, passwordConfirm],
  )

  const isFormValid =
    name !== '' &&
    email !== '' &&
    password !== '' &&
    nameErrorMessage === '' &&
    emailErrorMessage === '' &&
    passwordErrorMessage === '' &&
    passwordConfirmErrorMessage === ''

  const submit = useCallback(async () => {
    if (!isFormValid || isSubmitting) {
      return
    }
    setIsSubmitting(true)
    try {
      const session = await registerUser({ name, email, password })
      setSession(session.user, session.accessToken, session.refreshToken)
      router.replace('/(tabs)')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível cadastrar. Tente novamente.'
      Alert.alert('Erro ao cadastrar', message)
    } finally {
      setIsSubmitting(false)
    }
  }, [name, email, password, isFormValid, isSubmitting, setSession])

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    nameTouched,
    setNameTouched,
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    passwordConfirmTouched,
    setPasswordConfirmTouched,
    nameErrorMessage,
    emailErrorMessage,
    passwordErrorMessage,
    passwordConfirmErrorMessage,
    isFormValid,
    isSubmitting,
    submit,
  }
}
