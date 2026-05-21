import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'
import { View, ViewProps } from 'react-native'

type props = ViewProps & {
  children: React.ReactNode
}

export const Background = ({ children, style, ...rest }: props) => {
  return (
    <View
      style={[styles.background, { backgroundColor: useThemeColor().background }, style]}
      {...rest}
    >
      {children}
    </View>
  )
}
