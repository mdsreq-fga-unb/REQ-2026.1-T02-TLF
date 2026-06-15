import { AndroidHardwareBackPortal } from '@/components/AndroidHardwareBackPortal'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone } from '@/utils/textTone'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, useColorScheme } from 'react-native'

void SplashScreen.preventAutoHideAsync()

export default function CategoryLayout() {
  const isDark = useColorScheme() === 'dark'
  const colors = useThemeColor()

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
            title: 'Categorias',

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
        <Stack.Screen name="[id]" options={{ title: 'Editar' }} />
      </Stack>
    </GestureHandlerRootView>
  )
}
