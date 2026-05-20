import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'

// Design system tokens
const OUTLINE = '#908fa0'
const OUTLINE_VARIANT = '#464554'
const SURFACE_CONTAINER_HIGH = '#292932'
const ON_SURFACE_VARIANT = '#c7c4d7'
const ON_SURFACE = '#e4e1ed'
const ERROR = '#f2685a'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

type BaseProps = {
  icon: MaterialIconName
  label: string
  isLast?: boolean
  error?: string
}

type PressableProps = BaseProps & {
  isInput?: false
  value: string
  onPress: () => void
}

type InputProps = BaseProps & {
  isInput: true
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

type Props = PressableProps | InputProps

export function FormField(props: Props) {
  const hasError = !!props.error
  const borderStyle = !props.isLast
    ? { borderBottomWidth: 1, borderBottomColor: `${OUTLINE_VARIANT}28` }
    : undefined

  if (props.isInput) {
    return (
      <>
        <View style={[styles.container, borderStyle]}>
          <View style={styles.content}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
              value={props.value}
              onChangeText={props.onChangeText}
              placeholder={props.placeholder ?? ''}
              placeholderTextColor={`${OUTLINE}88`}
              style={styles.input}
              multiline
            />
          </View>
          <View style={styles.iconWrap}>
            <MaterialIcons name={props.icon} size={20} color={ON_SURFACE_VARIANT} />
          </View>
        </View>
        {hasError && <Text style={styles.error}>{props.error}</Text>}
      </>
    )
  }

  return (
    <>
      <Pressable style={[styles.container, borderStyle]} onPress={props.onPress}>
        <View style={styles.content}>
          <Text style={styles.label}>{props.label}</Text>
          <Text
            style={[
              styles.value,
              { color: props.value ? ON_SURFACE : hasError ? ERROR : `${OUTLINE}88` },
            ]}
            numberOfLines={1}
          >
            {props.value || 'Selecionar...'}
          </Text>
        </View>
        <View style={styles.iconWrap}>
          <MaterialIcons
            name={props.icon}
            size={20}
            color={hasError ? ERROR : ON_SURFACE_VARIANT}
          />
        </View>
      </Pressable>
      {hasError && <Text style={styles.error}>{props.error}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: OUTLINE,
  },
  value: {
    fontSize: 15,
    fontWeight: '400',
  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    padding: 0,
    minHeight: 22,
    color: ON_SURFACE,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SURFACE_CONTAINER_HIGH,
  },
  error: {
    fontSize: 12,
    color: ERROR,
    paddingBottom: 8,
    paddingHorizontal: 2,
  },
})
