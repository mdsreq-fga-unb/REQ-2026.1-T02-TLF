import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Entrar' }} />
      <Stack.Screen name="register" options={{ title: 'Criar conta' }} />
    </Stack>
  )
}
