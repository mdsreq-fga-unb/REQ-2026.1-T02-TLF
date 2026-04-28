import { useThemeColor } from '@/hooks/useThemeColor'
import { View } from 'react-native'

export const ThemedView = ({ children }: { children: React.ReactNode }) => {
  return <View style={{ flex: 1, backgroundColor: useThemeColor().primary }}>{children}</View>
}
