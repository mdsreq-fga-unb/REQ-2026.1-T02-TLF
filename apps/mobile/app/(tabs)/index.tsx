import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export default function home() {
  return (
    //TODO: add a logout button and make the logout function
    <ThemedBackground>
      <SafeAreaView />
      <ThemedContainer>
        <ThemedButton title="Estatisticas" onPress={() => router.push('/(budget)/')} />
      </ThemedContainer>
    </ThemedBackground>
  )
}
