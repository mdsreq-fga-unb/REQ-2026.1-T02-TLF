import { useState, useEffect } from 'react'
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
import { AlertCircle, Lock, Mail, User } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RegisterScreen() {
  const colors = useThemeColor()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')

  useEffect(() => {
    const fullNameRegex = /\S+\s+\S+/
    const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/

    if (name === '') {
      setNameError('Por favor insira um nome')
    } else if (!fullNameRegex.test(name)) {
      setNameError('Insira pelo menos nome e sobrenome')
    } else if (!lettersRegex.test(name)) {
      setNameError('Insira apenas letras do alfabeto')
    } else {
      setNameError('')
    }
  }, [name])

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if (password === '') {
      setPasswordError('Por favor insira uma senha')
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Senha precisa ter no mínimo 6 caracteres, pelo menos 1 letra e 1 número')
    } else {
      setPasswordError('')
    }
  }, [password])

  useEffect(() => {
    if (passwordConfirm !== password) {
      setPasswordConfirmError('Essas senhas não coincidiram, Tente novamente.')
    } else {
      setPasswordConfirmError('')
    }
  }, [passwordConfirm, password])

  const isFormValid =
    name !== '' &&
    email !== '' &&
    password !== '' &&
    nameError === '' &&
    emailError === '' &&
    passwordError === '' &&
    passwordConfirmError === ''

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
              <ThemedText variant="headline" text="Criar uma conta," />
              <ThemedText
                variant="body"
                tone="muted"
                text="Junte-se ao nosso ecossistema financeiro para começar a sua jornada"
              />
            </ThemedContainer>

            <ThemedInputContainer text="Nome Completo">
              <ThemedInputForm
                icon={User}
                placeholder="Rodrigo Átila Tavares"
                onChangeText={setName}
                autoCapitalize="words"
                value={name}
                onBlur={() => {
                  setNameTouched(true)
                }}
              />
              {nameError && nameTouched && (
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
                    text={nameError}
                    style={{ textAlign: 'left', flex: 1 }}
                  />
                </ThemedContainer>
              )}
            </ThemedInputContainer>

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

            <ThemedInputContainer text="Confirme a senha">
              <ThemedInputForm
                icon={Lock}
                placeholder="******"
                onChangeText={setPasswordConfirm}
                secureTextEntry
                value={passwordConfirm}
                onBlur={() => {
                  setPasswordConfirmTouched(true)
                }}
              />
              {passwordConfirmError && passwordConfirmTouched && (
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
                    text={passwordConfirmError}
                    style={{ textAlign: 'left', flex: 1 }}
                  />
                </ThemedContainer>
              )}
            </ThemedInputContainer>

            <ThemedButton title="Cadastrar" disabled={!isFormValid} />
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
                text="Já possui uma conta? "
                style={{ textAlign: 'center' }}
              />
              <ThemedLink href={'/login'} text="Entre aqui" />
            </ThemedContainer>
          </ThemedContainer>
        </ThemedContainer>
      </ThemedScrollArea>
    </ThemedBackground>
  )
}
