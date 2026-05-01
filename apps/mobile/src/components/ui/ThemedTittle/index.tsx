import { Text, TextProps } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = TextProps & {
  text: string
}

export function ThemedTittle({ text, ...rest }: props) {
  return (
    <Text style={[styles.tittle, { color: useThemeColor().text }]} {...rest}>
      {text}
    </Text>
  )
}
