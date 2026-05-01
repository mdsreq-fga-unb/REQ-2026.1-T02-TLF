import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark'

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
