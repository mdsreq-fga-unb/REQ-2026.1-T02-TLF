import { useThemeStore } from '@/stores/theme'
import { themes } from '@/utils/colors'
import { useColorScheme } from 'react-native'

type Theme = 'light' | 'dark'

export function useResolvedTheme(): Theme {
  const { theme } = useThemeStore()
  const systemTheme = useColorScheme()

  return theme === 'system' ? (systemTheme === 'dark' ? 'dark' : 'light') : theme
}

export const useThemeColor = () => {
  const currentTheme = useResolvedTheme()
  return themes[currentTheme]
}
