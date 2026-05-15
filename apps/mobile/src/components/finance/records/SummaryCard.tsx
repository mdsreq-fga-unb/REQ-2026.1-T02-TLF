import { StyleSheet, Text, ViewStyle, StyleProp } from 'react-native'
import { Container } from '@/components/ui/Container'
import { useThemeColor } from '@/hooks/useThemeColor'

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
  const theme = useThemeColor()
  const valueStyle = size === 'lg' ? styles.valueLarge : styles.valueSmall
  const alignmentStyle = align === 'center' ? styles.centered : null
  const textAlignStyle = align === 'center' ? styles.textCentered : null

  return (
    <Container style={[styles.card, alignmentStyle, style]}>
      <Text style={[styles.label, { color: theme.graySecondary }, textAlignStyle]}>{label}</Text>
      <Text style={[valueStyle, { color: valueColor ?? theme.text }, textAlignStyle]}>{value}</Text>
      {caption ? (
        <Text style={[styles.caption, { color: theme.graySecondary }, textAlignStyle]}>
          {caption}
        </Text>
      ) : null}
    </Container>
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
