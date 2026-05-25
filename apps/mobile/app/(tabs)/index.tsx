import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ThemedLink } from '@/components/ui/ThemedLink'
import { debugStoredTokens } from '@/services/api/token-storage'

export default function home() {
  return (
    //TODO: add a logout button and make the logout function
    <ThemedBackground>
      <SafeAreaView />
      <ThemedContainer>
        <ThemedButton title="Estatisticas" onPress={() => router.push('/(budget)/')} />
        <ThemedButton title="tokens" onPress={debugStoredTokens} />
        <ThemedLink replace href="/(auth)/login" text="Crie uma conta aqui" />
      </ThemedContainer>
    </ThemedBackground>
  )
}
