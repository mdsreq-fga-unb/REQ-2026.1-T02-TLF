import { useResolvedTheme } from '@/hooks/useThemeColor'
import { StatusBar } from 'expo-status-bar'

export function ThemedStatusBar() {
  const theme = useResolvedTheme()

  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
}
