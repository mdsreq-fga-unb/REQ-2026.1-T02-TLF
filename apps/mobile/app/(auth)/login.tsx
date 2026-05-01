import { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import NamedLogo from '../../assets/imgs/hat.png'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { Background } from '@/components/ui/Background'
import { Container } from '@/components/ui/Container'
import { InputForm } from '@/components/ui/InputForm'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Separator } from '@/components/ui/Separator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedTittle } from '@/components/ui/ThemedTittle'
import { ThemedText } from '@/components/ui/ThemedText'
import { InputContainer } from '@/components/ui/InputContainer'
import { ThemedLink } from '@/components/ui/ThemedlLink'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const themeColor = useThemeColor()

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
    // Mínimo 6 caracteres, pelo menos 1 letra e 1 número
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if (password === '') {
      setPasswordError('Por favor insira uma senha')
    } else {
      setPasswordError('')
    }
  }, [password])

  // E-mail e senha n podem ser vazios, e nenhum erro está presente
  const isFormValid = email !== '' && password !== '' && emailError === '' && passwordError === ''

  return (
    <Background>
      <ScrollView>
        <SafeAreaView />
        <Container style={{ backgroundColor: 'transparent' }}>
          <Image source={NamedLogo} style={{ width: 150, height: 150 }} />
          <Container style={{ marginBottom: 20 }}>
            <Container style={{ backgroundColor: 'transparent', gap: 0, padding: 0 }}>
              <ThemedTittle text="Bem vindo de volta," />
              <ThemedText text="Entre para gerenciar seu portifolio" children />
            </Container>
            <InputContainer text=" E-mail">
              <InputForm
                icon="mail-outline"
                placeholder="exemplo@email.com"
                placeholderTextColor={themeColor.graySecondary}
                onChangeText={setEmail}
                keyboardType="email-address"
                value={email}
                onBlur={() => {
                  setEmailTouched(true)
                }}
              />
              {emailError && emailTouched && (
                <Container style={{ flexDirection: 'row', padding: 0, gap: 10 }}>
                  <MaterialIcons size={20} name="error" color={themeColor.warning} />
                  <ThemedText
                    text={emailError}
                    children
                    style={{ color: themeColor.warning, textAlign: 'left' }}
                  />
                </Container>
              )}
            </InputContainer>

            <InputContainer text=" Senha">
              <InputForm
                icon="lock-closed-outline"
                placeholder="******"
                placeholderTextColor={themeColor.graySecondary}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onBlur={() => {
                  setPasswordTouched(true)
                }}
              />
              {passwordError && passwordTouched && (
                <Container style={{ flexDirection: 'row', padding: 0, gap: 10 }}>
                  <MaterialIcons size={20} name="error" color={themeColor.warning} />
                  <ThemedText
                    text={passwordError}
                    children
                    style={{ color: themeColor.warning, textAlign: 'left' }}
                  />
                </Container>
              )}
            </InputContainer>
            <ButtonPrimary title="Entrar" disabled={!isFormValid} />
            <Separator />
            <ThemedText
              text="Não possui uma conta? "
              style={{ color: themeColor.text, textAlign: 'center' }}
            >
              <ThemedLink href={'/register'} text="Crie uma conta aqui" />
            </ThemedText>
          </Container>
        </Container>
      </ScrollView>
    </Background>
  )
}
