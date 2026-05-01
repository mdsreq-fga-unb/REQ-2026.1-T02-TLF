import { useState } from 'react'
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

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
                placeholderTextColor={useThemeColor().graySecondary}
                onChangeText={(newText) => setEmail(newText)}
                keyboardType="email-address"
                value={email}
              />
            </InputContainer>

            <InputContainer text=" Senha">
              <InputForm
                icon="lock-closed-outline"
                placeholder="******"
                placeholderTextColor={useThemeColor().graySecondary}
                onChangeText={(newText) => setPassword(newText)}
                secureTextEntry
                value={password}
              />
            </InputContainer>
            <ButtonPrimary title="Entrar" />
            <Separator />
            <ThemedText
              text="Não possui uma conta? "
              style={{ color: useThemeColor().text, textAlign: 'center' }}
            >
              <ThemedLink href={'/register'} text="Crie uma conta aqui" />
            </ThemedText>
          </Container>
        </Container>
      </ScrollView>
    </Background>
  )
}
