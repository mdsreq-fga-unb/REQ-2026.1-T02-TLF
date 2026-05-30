import { StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'

type CardSize = 'lg' | 'md'
type CardAlign = 'left' | 'center'

type props = {
  label: string
  value: string
  caption?: string
  valueColor?: string
  size?: CardSize
  align?: CardAlign
  style?: StyleProp<ViewStyle>
}

export function SummaryCard({
  label,
  value,
  caption,
  valueColor,
  size = 'md',
  align = 'left',
  style,
}: props) {
  const valueStyle = size === 'lg' ? styles.valueLarge : styles.valueSmall
  const alignmentStyle = align === 'center' ? styles.centered : null
  const textAlignStyle = align === 'center' ? styles.textCentered : null

  return (
    <ThemedContainer style={[styles.card, alignmentStyle, style]}>
      <ThemedText
        text={label}
        variant="caption"
        tone="muted"
        style={[styles.label, textAlignStyle]}
      />
      <ThemedText
        text={value}
        variant="title"
        style={[valueStyle, valueColor ? { color: valueColor } : null, textAlignStyle]}
      />
      {caption ? (
        <ThemedText
          text={caption}
          variant="caption"
          tone="muted"
          style={[styles.caption, textAlignStyle]}
        />
      ) : null}
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
  },
  centered: {
    alignItems: 'center',
  },
  textCentered: {
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  valueLarge: {
    fontSize: 32,
    fontWeight: '700',
  },
  valueSmall: {
    fontSize: 22,
    fontWeight: '700',
  },
  caption: {
    fontSize: 12,
  },
})
