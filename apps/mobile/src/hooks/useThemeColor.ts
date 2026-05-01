import { useThemeStore } from '@/stores/theme'
import { Colors } from '@/utils/colors'
import { useColorScheme } from 'react-native'

type Theme = 'light' | 'dark'

export const useThemeColor = () => {
  const { theme } = useThemeStore()
  const systemTheme = useColorScheme()

  const currentTheme = theme === 'system' ? systemTheme : theme
  return Colors[(currentTheme as Theme) ?? 'light']
}
