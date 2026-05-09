import { fonts } from '@/utils/fonts'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark'

  const [fontsLoaded] = useFonts(fonts.Manrope.files)

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

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
