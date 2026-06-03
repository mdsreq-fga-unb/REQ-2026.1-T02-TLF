import { useThemeColor } from '@/hooks/useThemeColor'
import { View } from 'react-native'
import { TextTypographyVariant, TextTone, ThemedText } from '../ThemedText'
import { styles } from './style'

type props = {
  variant?: TextTypographyVariant
  tone?: TextTone
  text?: string
}

export function ThemedHeader({ variant = 'display', tone = 'default', text = 'titulo' }: props) {
  const colors = useThemeColor()
  return (
    <View style={[styles.header, { backgroundColor: 'transparent', borderColor: colors.border }]}>
      <ThemedText
        children
        text={text}
        tone={tone}
        variant={variant}
        style={{ alignSelf: 'auto' }}
      />
    </View>
  )
}
