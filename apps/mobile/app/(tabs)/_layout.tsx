import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="records" options={{ title: 'Histórico' }} />
      <Tabs.Screen name="registro" options={{ title: 'Registrar' }} />
      <Tabs.Screen name="cards" options={{ title: 'Cards' }} />
      <Tabs.Screen name="budgets" options={{ title: 'Orçamentos' }} />
    </Tabs>
  )
}
