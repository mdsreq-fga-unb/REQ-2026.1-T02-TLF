import { TextInput, TextInputProps } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      {...rest}
      style={[
        styles.input,
        { backgroundColor: useThemeColor().blueSecondary, color: useThemeColor().text },
      ]}
    />
  )
}
