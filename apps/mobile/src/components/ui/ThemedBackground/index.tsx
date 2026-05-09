import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'
import { View } from 'react-native'

export function ThemedBackground({ children }: { children: React.ReactNode }) {
  const colors = useThemeColor()

  return <View style={[styles.background, { backgroundColor: colors.background }]}>{children}</View>
}
