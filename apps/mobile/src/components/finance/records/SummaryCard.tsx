import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'

type CardAlign = 'left' | 'center'

type props = {
  label: string
  value: string
  caption?: string
  valueColor?: string
  align?: CardAlign
  style?: StyleProp<ViewStyle>
}

export function SummaryCard({ label, value, caption, valueColor, align = 'left', style }: props) {
  const textAlignStyle = align === 'center' ? styles.textCentered : null

  return (
    <ThemedContainer style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <ThemedText
          text={label}
          variant="caption"
          tone="muted"
          style={[styles.label, textAlignStyle, align === 'center' && styles.labelCentered]}
        />
        {caption ? (
          <ThemedText
            text={caption}
            variant="caption"
            tone="muted"
            style={[styles.caption, textAlignStyle]}
          />
        ) : null}
      </View>

      <ThemedText
        text={value}
        variant="title"
        style={[styles.value, valueColor ? { color: valueColor } : null, textAlignStyle]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      />
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    width: '100%',
    alignItems: 'stretch',
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    textAlign: 'left',
    flex: 1,
  },
  labelCentered: {
    flex: 0,
    textAlign: 'center',
  },
  caption: {
    fontSize: 11,
    flexShrink: 0,
    textAlign: 'right',
  },
  value: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '700',
  },
  textCentered: {
    textAlign: 'center',
  },
})
