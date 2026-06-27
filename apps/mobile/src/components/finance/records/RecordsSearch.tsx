import { StyleSheet, TextInput, View } from 'react-native'
import { Search } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = {
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
}

export function RecordsSearch({ value, onChangeText, placeholder = 'Search Record' }: props) {
  const theme = useThemeColor()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surfaceMuted,
          borderColor: theme.mutedForeground,
        },
      ]}
    >
      <Search size={18} color={theme.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.mutedForeground}
        style={[styles.input, { color: theme.foreground }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
})
