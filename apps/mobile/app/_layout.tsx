import { AndroidHardwareBackPortal } from '@/components/AndroidHardwareBackPortal'
import { ThemedStatusBar } from '@/components/ui/ThemedStatusBar'
import { useThemeColor } from '@/hooks/useThemeColor'
import { database } from '@/services/database'
import { fonts } from '@/utils/fonts'
import { DatabaseProvider } from '@nozbe/watermelondb/react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSync } from '@/hooks/sync/useSync'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useSync()
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
        <ThemedStatusBar />
        <ActivityIndicator size="large" color={colors.primary} />
      </>
    )
  }

  return (
    <DatabaseProvider database={database}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemedStatusBar />
        <AndroidHardwareBackPortal />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(budget)" options={{ presentation: 'modal' }} />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="edit-record/[id]" options={{ presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </DatabaseProvider>
  )
}
