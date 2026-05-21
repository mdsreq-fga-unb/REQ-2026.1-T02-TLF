import { AndroidHardwareBackPortal } from '@/components/AndroidHardwareBackPortal'
import { fonts } from '@/utils/fonts'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone } from '@/utils/textTone'
import { Ionicons } from '@expo/vector-icons'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AndroidHardwareBackPortal />
      <Stack
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: true,
          headerTitleStyle: {
            color: resolveTextTone(colors, 'default'),
            fontSize: 20,
            fontWeight: 700,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: 'trasparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="chevron-back" size={22} color={colors.foreground} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Orçamentos e metas',

            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push('/create')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="add" size={22} color={colors.foreground} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="create" options={{ title: 'Adicionar' }} />
        <Stack.Screen name="edit" options={{ title: 'Editar' }} />
      </Stack>
    </GestureHandlerRootView>
  )
}
