import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'
import { View } from 'react-native'

export const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={[styles.background, { backgroundColor: useThemeColor().background }]}>
      {children}
    </View>
  )
}
