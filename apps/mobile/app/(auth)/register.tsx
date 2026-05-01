import { useState, useEffect } from 'react'
import { Image } from 'react-native'
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
import { ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function LoginScreen() {
  const themeColor = useThemeColor()

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
    // Pelo menos duas palavras separadas por espaço
    // pelo menos uma letra por palavras
    const fullNameRegex = /\S+\s+\S+/

    // somente caracteres de A-Z, sem número ou caracteres estranhos
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
    // Mínimo 6 caracteres, pelo menos 1 letra e 1 número
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

  // Nome, E-mail, senha n podem ser vazios,e nenhum erro está presente
  const isFormValid =
    name !== '' &&
    email !== '' &&
    password !== '' &&
    nameError === '' &&
    emailError === '' &&
    passwordError === '' &&
    passwordConfirmError === ''

  return (
    <Background>
      <ScrollView>
        <SafeAreaView />
        <Container style={{ backgroundColor: 'transparent' }}>
          <Image source={NamedLogo} style={{ width: 150, height: 150 }} />
          <Container style={{ marginBottom: 20 }}>
            <Container style={{ backgroundColor: 'transparent', gap: 0, padding: 0 }}>
              <ThemedTittle text="Criar uma conta," />
              <ThemedText
                text="Junte-se ao nosso ecossistema financeiro para começar a sua jornada"
                children
              />
            </Container>

            <InputContainer text=" Nome Completo">
              <InputForm
                icon="person-outline"
                placeholder="Rodrigo Átila Tavares"
                placeholderTextColor={themeColor.graySecondary}
                onChangeText={setName}
                keyboardType="email-address"
                value={name}
                onBlur={() => {
                  setNameTouched(true)
                }}
              />
              {nameError && nameTouched && (
                <Container style={{ flexDirection: 'row', padding: 0, gap: 10 }}>
                  <MaterialIcons size={20} name="error" color={themeColor.warning} />
                  <ThemedText
                    text={nameError}
                    children
                    style={{ color: themeColor.warning, textAlign: 'left' }}
                  />
                </Container>
              )}
            </InputContainer>

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

            <InputContainer text=" Confirme a senha">
              <InputForm
                icon="lock-closed-outline"
                placeholder="******"
                placeholderTextColor={themeColor.graySecondary}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                value={passwordConfirm}
                onBlur={() => {
                  setPasswordConfirmTouched(true)
                }}
              />
              {passwordConfirmError && passwordConfirmTouched && (
                <Container style={{ flexDirection: 'row', padding: 0, gap: 10 }}>
                  <MaterialIcons size={20} name="error" color={themeColor.warning} />
                  <ThemedText
                    text={passwordConfirmError}
                    children
                    style={{ color: themeColor.warning, textAlign: 'left' }}
                  />
                </Container>
              )}
            </InputContainer>

            <ButtonPrimary title="Entrar" disabled={!isFormValid} />
            <Separator />
            <ThemedText
              text="Já possui uma conta? "
              style={{ color: themeColor.text, textAlign: 'center' }}
            >
              <ThemedLink href={'/login'} text="Entre aqui" />
            </ThemedText>
          </Container>
        </Container>
      </ScrollView>
    </Background>
  )
}
