import { Stack } from 'expo-router'

export default function InstituicaoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="aparencia" />
      <Stack.Screen name="nova" />
      <Stack.Screen name="[id]" />
    </Stack>
  )
}
