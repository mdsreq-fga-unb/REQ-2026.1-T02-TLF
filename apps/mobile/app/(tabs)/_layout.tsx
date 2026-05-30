import { useThemeColor } from '@/hooks/useThemeColor'
import { Tabs } from 'expo-router'
import { FileText, Home, Menu, Plus, WalletCards } from 'lucide-react-native'

export default function TabsLayout() {
  const colors = useThemeColor()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', tabBarIcon: ({ color }) => <Home color={color} /> }}
      />
      <Tabs.Screen
        name="records"
        options={{ title: 'Histórico', tabBarIcon: ({ color }) => <FileText color={color} /> }}
      />
      <Tabs.Screen
        name="registro"
        options={{ title: 'Registrar', tabBarIcon: ({ color }) => <Plus color={color} /> }}
      />
      <Tabs.Screen
        name="cards"
        options={{ title: 'Cards', tabBarIcon: ({ color }) => <WalletCards color={color} /> }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: 'Menu', tabBarIcon: ({ color }) => <Menu color={color} /> }}
      />
    </Tabs>
  )
}
