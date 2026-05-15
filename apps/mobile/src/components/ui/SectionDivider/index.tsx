import { View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

export function SectionDivider() {
  const theme = useThemeColor()

  return <View style={[styles.divider, { backgroundColor: theme.graySecondary }]} />
}
