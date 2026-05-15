import { StyleSheet, TextInput, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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
          backgroundColor: theme.gray,
          borderColor: theme.graySecondary,
        },
      ]}
    >
      <MaterialIcons name="search" size={18} color={theme.graySecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.graySecondary}
        style={[styles.input, { color: theme.text }]}
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
