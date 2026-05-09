import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import NamedLogo from '../../assets/imgs/tlt-icon.png'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedLink } from '@/components/ui/ThemedLink'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { layout, spacing } from '@/utils/dimensions'
import { login } from '@/services/api/auth'
import { useAuthStore } from '@/stores/auth'
import { router } from 'expo-router'
import { AlertCircle, Lock, Mail } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const colors = useThemeColor()

  const handleLogin = async () => {
    try {
      const response = await login(email, password)
      useAuthStore.getState().setSession(response.user, response.accessToken, response.refreshToken)
      router.replace('/(tabs)')
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email === '') {
      setEmailError('Por favor insira um E-mail')
    } else if (!emailRegex.test(email)) {
      setEmailError('E-mail invalido')
    } else {
      setEmailError('')
    }
  }, [email])

  useEffect(() => {
    if (password === '') {
      setPasswordError('Por favor insira uma senha')
    } else {
      setPasswordError('')
    }
  }, [password])

  const isFormValid = email !== '' && password !== '' && emailError === '' && passwordError === ''

  return (
    <ThemedBackground>
      <ThemedScrollArea>
        <SafeAreaView />
        <ThemedContainer variant="transparent" style={{ gap: 0 }}>
          <Image
            source={NamedLogo}
            style={{ width: layout.authLogoSize, height: layout.authLogoSize }}
          />
          <ThemedContainer variant="transparent" style={{ marginBottom: spacing.lg }}>
            <ThemedContainer variant="transparent" style={{ gap: 0, padding: 0 }}>
              <ThemedText variant="headline" text="Bem vindo de volta," />
              <ThemedText variant="body" tone="muted" text="Entre para gerenciar seu portifolio" />
            </ThemedContainer>
            <ThemedInputContainer text="E-mail">
              <ThemedInputForm
                icon={Mail}
                placeholder="exemplo@email.com"
                onChangeText={setEmail}
                keyboardType="email-address"
                value={email}
                onBlur={() => {
                  setEmailTouched(true)
                }}
              />
              {emailError && emailTouched && (
                <ThemedContainer
                  variant="transparent"
                  style={{
                    flexDirection: 'row',
                    padding: 0,
                    gap: spacing.sm,
                    alignItems: 'center',
                  }}
                >
                  <AlertCircle size={20} color={colors.destructive} strokeWidth={2} />
                  <ThemedText
                    variant="caption"
                    tone="destructive"
                    text={emailError}
                    style={{ textAlign: 'left', flex: 1 }}
                  />
                </ThemedContainer>
              )}
            </ThemedInputContainer>

            <ThemedInputContainer text="Senha">
              <ThemedInputForm
                icon={Lock}
                placeholder="******"
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onBlur={() => {
                  setPasswordTouched(true)
                }}
              />
              {passwordError && passwordTouched && (
                <ThemedContainer
                  variant="transparent"
                  style={{
                    flexDirection: 'row',
                    padding: 0,
                    gap: spacing.sm,
                    alignItems: 'center',
                  }}
                >
                  <AlertCircle size={20} color={colors.destructive} strokeWidth={2} />
                  <ThemedText
                    variant="caption"
                    tone="destructive"
                    text={passwordError}
                    style={{ textAlign: 'left', flex: 1 }}
                  />
                </ThemedContainer>
              )}
            </ThemedInputContainer>
            <ThemedButton title="Entrar" onPress={handleLogin} disabled={!isFormValid} />
            <ThemedSeparator />
            <ThemedContainer
              variant="transparent"
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: spacing.xs,
                padding: 0,
              }}
            >
              <ThemedText
                variant="body"
                text="Não possui uma conta? "
                style={{ textAlign: 'center' }}
              />
              <ThemedLink href={'/register'} text="Crie uma conta aqui" />
            </ThemedContainer>
          </ThemedContainer>
        </ThemedContainer>
      </ThemedScrollArea>
    </ThemedBackground>
  )
}
