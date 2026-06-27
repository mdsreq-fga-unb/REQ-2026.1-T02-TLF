import { ActivityIndicator } from 'react-native'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedStatusBar } from '@/components/ui/ThemedStatusBar'

export default function IndexRoute() {
  const colors = useThemeColor()
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isBootstrapping) {
    return (
      <>
        <ThemedStatusBar />
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      </>
    )
  }

  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/login'} />
}
