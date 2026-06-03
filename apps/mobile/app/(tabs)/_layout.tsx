import { useThemeColor } from '@/hooks/useThemeColor'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Pressable } from 'react-native'

export default function TabsLayout() {
  const colors = useThemeColor()
  const insets = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: colors.border,
          height: 60 + insets.bottom,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registro"
        options={{
          title: '',
          tabBarLabel: () => {
            return null
          },
          tabBarButton: (props) => (
            // Ignorar erro do pressable
            <Pressable {...props} style={{ alignItems: 'center', marginTop: 0 }}>
              <Ionicons name="add-circle" size={55} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Contas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet-bifold-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'menu',
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
