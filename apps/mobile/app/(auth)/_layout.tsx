import { useThemeColor } from '@/hooks/useThemeColor'
import { iconSize } from '@/utils/dimensions'
import { Tabs } from 'expo-router'
import { BookOpen, LogIn } from 'lucide-react-native'

export default function TabsLayout() {
  const colors = useThemeColor()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.tabBarBorder,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: 'Entrar',
          tabBarIcon: ({ focused }) => (
            <LogIn
              size={iconSize.tab}
              strokeWidth={2}
              color={focused ? colors.tabActive : colors.tabInactive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ focused }) => (
            <BookOpen
              size={iconSize.tab}
              strokeWidth={2}
              color={focused ? colors.tabActive : colors.tabInactive}
            />
          ),
        }}
      />
    </Tabs>
  )
}
