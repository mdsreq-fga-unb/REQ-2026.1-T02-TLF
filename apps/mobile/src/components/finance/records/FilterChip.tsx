import { Pressable, StyleSheet, Text } from 'react-native'
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
          borderColor: theme.graySecondary,
          backgroundColor: isActive ? theme.bluePrimary : 'transparent',
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: isActive ? theme.text : theme.graySecondary }]}>
        {label}
      </Text>
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
