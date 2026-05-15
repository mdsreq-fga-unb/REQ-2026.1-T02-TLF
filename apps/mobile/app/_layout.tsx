import { AndroidHardwareBackPortal } from '@/components/AndroidHardwareBackPortal'
import { fonts } from '@/utils/fonts'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { ActivityIndicator, useColorScheme } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark'
  const colors = useThemeColor()

  const [fontsLoaded] = useFonts(fonts.Manrope.files)

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return (
      <>
        <ActivityIndicator size="large" color={colors.primary} />
      </>
    )
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AndroidHardwareBackPortal />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
