import { useThemeColor } from '@/hooks/useThemeColor'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: useThemeColor().background,
          borderTopColor: useThemeColor().gray,
        },
        tabBarActiveTintColor: useThemeColor().graySecondary,
        tabBarInactiveTintColor: useThemeColor().gray,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: 'Entrar',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={30}
              name={focused ? 'log-in' : 'log-in-outline'}
              color={focused ? useThemeColor().graySecondary : useThemeColor().gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={30}
              name={focused ? 'book' : 'book-outline'}
              color={focused ? useThemeColor().graySecondary : useThemeColor().gray}
            />
          ),
        }}
      />
    </Tabs>
  )
}
