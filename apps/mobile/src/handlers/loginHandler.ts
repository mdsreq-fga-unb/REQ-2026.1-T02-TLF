import { useRouter } from 'expo-router'

const API_URL = process.env.EXPO_PUBLIC_API_URL
const router = useRouter()

export async function handleLogin(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao logar')
    }

    router.replace('/')
  } catch (error) {
    console.error(error)
  }
}
