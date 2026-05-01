import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { View } from 'react-native'

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <View style={[styles.container, { backgroundColor: useThemeColor().gray }]}>{children}</View>
  )
}
