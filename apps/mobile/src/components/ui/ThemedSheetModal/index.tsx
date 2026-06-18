import { Modal, Pressable, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import { resolveTextTone, type ButtonFillTone, type TextTone } from '@/utils/textTone'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

export type SheetModalAction = {
  label: string
  onPress: () => void
  fillTone?: ButtonFillTone
  textTone?: TextTone
  outlined?: boolean
}

type Props = {
  visible: boolean
  onRequestClose: () => void
  title: string
  message: string
  actions: SheetModalAction[]
  icon?: IconKey
  iconTone?: TextTone
}

export function ThemedSheetModal({
  visible,
  onRequestClose,
  title,
  message,
  actions,
  icon,
  iconTone = 'destructive',
}: Props) {
  const theme = useThemeColor()
  const accent = resolveTextTone(theme, iconTone)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          onPress={onRequestClose}
          style={styles.backdrop}
        />

        <View style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {icon ? (
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: `${accent}1A`, borderColor: `${accent}33` },
              ]}
            >
              <AppIcon name={icon} size={32} color={accent} />
            </View>
          ) : null}

          <ThemedText variant="headline" text={title} style={styles.title} />
          <ThemedText variant="body" tone="muted" text={message} style={styles.message} />

          <View style={styles.actions}>
            {actions.map((action, index) => (
              <ThemedButton
                key={`${action.label}-${index}`}
                title={action.label}
                onPress={action.onPress}
                fillTone={action.outlined ? 'surface' : (action.fillTone ?? 'primary')}
                textTone={action.textTone ?? (action.outlined ? 'default' : 'onPrimary')}
                style={[
                  styles.actionButton,
                  action.outlined ? { borderWidth: 1, borderColor: theme.border } : null,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}
