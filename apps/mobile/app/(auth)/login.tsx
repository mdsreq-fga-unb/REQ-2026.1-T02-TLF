import { useState } from 'react'
import { Image } from 'react-native'
import NamedLogo from '../../assets/imgs/hat.png'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { Background } from '@/components/ui/background'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Separator } from '@/components/ui/Separator'
import { ButtonSecondary } from '@/components/ui/ButtonSecondary'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { ThemedTittle } from '@/components/ui/ThemedTittle'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Background>
      <SafeAreaView />
      <Image source={NamedLogo} style={{ width: 150, height: 150 }} />
      <Container>
        <ThemedTittle text="Entrar na sua conta" />
        <Input
          placeholder="E-mail"
          placeholderTextColor={useThemeColor().text}
          onChangeText={(newText) => setEmail(newText)}
          keyboardType="email-address"
          value={email}
        />
        <Input
          placeholder="Senha"
          placeholderTextColor={useThemeColor().text}
          onChangeText={(newText) => setPassword(newText)}
          secureTextEntry
          value={password}
        />
        <ButtonPrimary title="Entrar" />
        <Separator />
        <ButtonSecondary title="Criar conta" onPress={() => router.push('/register')} />
      </Container>
    </Background>
  )
}
