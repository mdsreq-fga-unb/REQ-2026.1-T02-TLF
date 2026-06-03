import { login } from '@/services/api/auth'
import { useAuthStore } from '@/stores/auth'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { getEmailError, getPasswordRequiredError } from '@/utils/validation/authValidation'

export function useLoginScreen() {
  const setSession = useAuthStore((s) => s.setSession)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const emailErrorMessage = useMemo(() => getEmailError(email), [email])
  const passwordErrorMessage = useMemo(() => getPasswordRequiredError(password), [password])

  const isFormValid =
    email !== '' && password !== '' && emailErrorMessage === '' && passwordErrorMessage === ''

  const submit = useCallback(async () => {
    if (!isFormValid || isSubmitting) {
      return
    }
    setIsSubmitting(true)
    try {
      const response = await login(email, password)
      setSession(response.user, response.accessToken, response.refreshToken)
      router.replace('/(tabs)')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.'
      setFeedbackMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }, [email, password, isFormValid, isSubmitting, setSession])

  const dismissFeedback = useCallback(() => setFeedbackMessage(null), [])

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    emailErrorMessage,
    passwordErrorMessage,
    isFormValid,
    isSubmitting,
    submit,
    feedbackMessage,
    dismissFeedback,
  }
}
