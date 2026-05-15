import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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
                backgroundColor: theme.gray,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={[styles.periodText, { color: theme.text }]}>{periodLabel}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={theme.graySecondary} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.spacer} />
      </View>

      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
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
