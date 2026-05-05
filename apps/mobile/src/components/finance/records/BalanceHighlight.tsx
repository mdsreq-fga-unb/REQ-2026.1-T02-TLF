import { StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = {
  value: number
  label?: string
  showDivider?: boolean
}

export function BalanceHighlight({ value, label = 'Saldo', showDivider = false }: props) {
  const theme = useThemeColor()
  const isPositive = value >= 0
  const accentColor = isPositive ? (theme.success ?? '#2CB67D') : theme.warning
  const sign = value < 0 ? '-' : ''
  const magnitude = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))

  return (
    <View style={styles.card}>
      <Text style={[styles.label, { color: applyAlpha(theme.text, 0.6) }]}>{label}</Text>
      <Text
        style={[
          styles.value,
          {
            color: accentColor,
            textShadowColor: applyAlpha(accentColor, 0.7),
          },
        ]}
      >
        {sign}
        <Text style={[styles.currency, { color: accentColor }]}>R$</Text> {magnitude}
      </Text>
      {showDivider ? (
        <View style={[styles.divider, { backgroundColor: applyAlpha(theme.graySecondary, 0.4) }]} />
      ) : null}
    </View>
  )
}

const applyAlpha = (hexColor: string, alpha: number) => {
  if (!hexColor.startsWith('#') || hexColor.length !== 7) return hexColor
  const value = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
  const suffix = value.toString(16).padStart(2, '0')
  return `${hexColor}${suffix}`
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.6,
  },
  value: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  currency: {
    fontSize: 24,
    fontWeight: '700',
  },
  divider: {
    width: '70%',
    height: 1,
  },
})
