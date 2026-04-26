import { ThemedView } from '@/components/ui/themed-view'
import { Link } from 'expo-router'
import { Text } from 'react-native'

export default function RegisterScreen() {
  return (
    <ThemedView>
      <Text>Register</Text>
      <Link href="/(auth)/login">Já tenho conta</Link>
    </ThemedView>
  )
}
