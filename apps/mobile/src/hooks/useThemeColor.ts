import { useThemeStore } from '@/stores/theme'
import { colors } from '@/utils/colors'
import { useColorScheme } from 'react-native'

type Theme = 'light' | 'dark'

export const useThemeColor = () => {
  const { theme } = useThemeStore()
  const systemTheme = useColorScheme()

  const currentTheme = theme === 'system' ? systemTheme : theme
  return colors[(currentTheme as Theme) ?? 'light']
}
