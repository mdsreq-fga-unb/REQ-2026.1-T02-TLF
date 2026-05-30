import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { AppIcon } from '@/utils/icons'

type BaseProps = {
  icon: AppIcon
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
  const theme = useThemeColor()
  const Icon = props.icon
  const hasError = !!props.error
  const borderStyle = !props.isLast
    ? { borderBottomWidth: 1, borderBottomColor: `${theme.border}28` }
    : undefined

  if (props.isInput) {
    return (
      <>
        <View style={[styles.container, borderStyle]}>
          <View style={styles.content}>
            <ThemedText text={props.label} variant="caption" tone="muted" style={styles.label} />
            <TextInput
              value={props.value}
              onChangeText={props.onChangeText}
              placeholder={props.placeholder ?? ''}
              placeholderTextColor={theme.mutedForeground}
              style={[styles.input, { color: theme.foreground }]}
              multiline
            />
          </View>
          <View style={[styles.iconWrap, { backgroundColor: theme.surfaceMuted }]}>
            <Icon size={20} color={theme.mutedForeground} />
          </View>
        </View>
        {hasError ? <ThemedFieldError message={props.error ?? ''} visible /> : null}
      </>
    )
  }

  return (
    <>
      <Pressable style={[styles.container, borderStyle]} onPress={props.onPress}>
        <View style={styles.content}>
          <ThemedText text={props.label} variant="caption" tone="muted" style={styles.label} />
          <ThemedText
            text={props.value || 'Selecionar...'}
            variant="body"
            tone={hasError ? 'destructive' : props.value ? 'default' : 'muted'}
            style={styles.value}
            numberOfLines={1}
          />
        </View>
        <View style={[styles.iconWrap, { backgroundColor: theme.surfaceMuted }]}>
          <Icon size={20} color={hasError ? theme.destructive : theme.mutedForeground} />
        </View>
      </Pressable>
      {hasError ? <ThemedFieldError message={props.error ?? ''} visible /> : null}
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
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
