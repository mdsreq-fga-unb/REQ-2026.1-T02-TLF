import { Pressable, StyleSheet, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = {
  title?: string
  periodLabel?: string
  onBack?: () => void
  onAdd?: () => void
  showPeriod?: boolean
}

export function RecordsHeader({
  title = 'Records',
  periodLabel = 'This Year',
  onBack: _onBack,
  onAdd: _onAdd,
  showPeriod = true,
}: props) {
  const theme = useThemeColor()

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.spacer} />

        {showPeriod ? (
          <Pressable
            onPress={() => undefined}
            style={({ pressed }) => [
              styles.periodButton,
              {
                backgroundColor: theme.surfaceMuted,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ThemedText text={periodLabel} variant="caption" style={styles.periodText} />
            <ChevronDown size={20} color={theme.mutedForeground} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.spacer} />
      </View>

      <View style={styles.titleRow}>
        <ThemedText text={title} variant="headline" style={styles.title} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
  },
  spacer: {
    width: 36,
    height: 36,
  },
})
