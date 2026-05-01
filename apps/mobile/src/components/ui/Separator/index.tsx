import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { View } from 'react-native'

export function Separator() {
  return (
    <View style={[styles.separator, { backgroundColor: useThemeColor().graySecondary }]}></View>
  )
}
