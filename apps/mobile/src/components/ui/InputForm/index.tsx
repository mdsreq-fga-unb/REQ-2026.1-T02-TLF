import { TextInput, TextInputProps, View } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ComponentProps } from 'react'

type IoniconsName = ComponentProps<typeof Ionicons>['name']
type props = TextInputProps & {
  icon: IoniconsName
}

export function InputForm({ icon, ...rest }: props) {
  return (
    <View
      style={[
        styles.inputForm,
        {
          backgroundColor: 'transparent',
          borderColor: useThemeColor().graySecondary,
        },
      ]}
    >
      <Ionicons
        size={30}
        name={icon}
        color={useThemeColor().graySecondary}
        style={{ margin: 10, marginRight: 0 }}
      />
      <TextInput
        {...rest}
        style={[
          styles.input,
          {
            color: useThemeColor().text,
          },
        ]}
      />
    </View>
  )
}
