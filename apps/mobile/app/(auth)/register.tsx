import { useState } from 'react'
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

export default function LoginScreen() {
  const [name, setName] = useState('')
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
                placeholderTextColor={useThemeColor().graySecondary}
                onChangeText={(newText) => setName(newText)}
                keyboardType="email-address"
                value={name}
              />
            </InputContainer>
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
              text="Já possui uma conta? "
              style={{ color: useThemeColor().text, textAlign: 'center' }}
            >
              <ThemedLink href={'/login'} text="Entre aqui" />
            </ThemedText>
          </Container>
        </Container>
      </ScrollView>
    </Background>
  )
}
