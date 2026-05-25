import { StyleSheet, Text, View } from 'react-native'

import { formatCurrency } from '@/utils/formatters'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { CategoryData } from './types'

type props = {
  category: CategoryData
  total: number
  minShare?: number
}

export function CategoryRow({ category, total, minShare = 2 }: props) {
  const theme = useThemeColor()
  const share = total <= 0 ? 0 : (category.amount / total) * 100
  const shareLabel = `${Math.round(share)}%`
  const barWidth = `${Math.max(share, minShare)}%` as `${number}%`
  const displayName = category.name || 'Sem categoria'

  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <View style={[styles.chip, { backgroundColor: category.color }]} />

        <View style={styles.nameCol}>
          <Text
            style={[styles.name, { color: theme.foreground }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayName}
          </Text>
        </View>

        <View style={styles.rightCol}>
          <Text style={[styles.amount, { color: theme.foreground }]}>
            {formatCurrency(category.amount)}
          </Text>
          <View style={[styles.badge, { backgroundColor: category.color }]}>
            <Text style={[styles.badgeText, { color: theme.background }]}>{shareLabel}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.barTrack, { backgroundColor: theme.mutedForeground }]}>
        <View style={[styles.barFill, { backgroundColor: category.color, width: barWidth }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  chip: {
    width: 14,
    height: 14,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  nameCol: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  amount: {
    fontSize: 13,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  barTrack: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
  },
})
