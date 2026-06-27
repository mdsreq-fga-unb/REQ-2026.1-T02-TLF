import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = {
  label: string
  isActive?: boolean
  onPress?: () => void
}

export function FilterChip({ label, isActive = false, onPress }: props) {
  const theme = useThemeColor()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: theme.mutedForeground,
          backgroundColor: isActive ? theme.primary : 'transparent',
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <ThemedText
        text={label}
        variant="caption"
        tone={isActive ? 'onPrimary' : 'muted'}
        style={styles.text}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
})
