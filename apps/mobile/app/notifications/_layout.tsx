import { Stack } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone } from '@/utils/textTone'

export default function NotificationsLayout() {
  const colors = useThemeColor()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: true,
        headerTitleStyle: {
          color: resolveTextTone(colors, 'default'),
          fontSize: 20,
          fontWeight: '700',
        },
        headerTintColor: resolveTextTone(colors, 'default'),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Notificações' }} />
    </Stack>
  )
}
