import { ThemedView } from '@/components/ui/themed-view'
import { Link } from 'expo-router'
import { Text } from 'react-native'

export default function LoginScreen() {
  return (
    <ThemedView>
      <Text>Login</Text>
      <Link href="/(auth)/register">Criar conta</Link>
    </ThemedView>
  )
}
