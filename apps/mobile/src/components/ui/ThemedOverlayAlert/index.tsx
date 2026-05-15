import { useThemeColor } from '@/hooks/useThemeColor'
import { iconSize, layout } from '@/utils/dimensions'
import { resolveButtonFill, type ButtonFillTone, type TextTone } from '@/utils/textTone'
import { X } from 'lucide-react-native'
import type { ReactNode } from 'react'
import { Modal, Pressable, TouchableOpacity } from 'react-native'
import { ThemedButton } from '../ThemedButton'
import { ThemedContainer } from '../ThemedContainer'
import { ThemedText } from '../ThemedText'
import { styles } from './style'

export type ThemedOverlayAlertAction = {
  label: string
  onPress: () => void
  fillTone?: ButtonFillTone
  textTone?: TextTone
}

type props = {
  visible: boolean
  onRequestClose: () => void
  message: string
  actions: ThemedOverlayAlertAction[]
  children?: ReactNode
}

export function ThemedOverlayAlert({ visible, onRequestClose, message, actions, children }: props) {
  const colors = useThemeColor()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <ThemedContainer variant="transparent" style={styles.overlay} accessibilityViewIsModal>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          onPress={onRequestClose}
          style={[styles.backdrop, { backgroundColor: 'rgba(0, 0, 0, 0.52)' }]}
        />
        <ThemedContainer
          style={[
            styles.card,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedContainer variant="transparent" style={styles.headerRow}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              onPress={onRequestClose}
              style={[styles.closeButton, { backgroundColor: resolveButtonFill(colors, 'muted') }]}
              hitSlop={{ top: layout.minTouchTarget / 4, bottom: layout.minTouchTarget / 4 }}
            >
              <X size={iconSize.md} color={colors.mutedForeground} strokeWidth={2} />
            </TouchableOpacity>
          </ThemedContainer>

          {children ? (
            <ThemedContainer variant="transparent" style={styles.media}>
              {children}
            </ThemedContainer>
          ) : null}

          <ThemedText variant="body" text={message} style={styles.message} />

          <ThemedContainer variant="transparent" style={styles.actionsRow}>
            {actions.map((action, index) => (
              <ThemedButton
                key={`${action.label}-${index}`}
                title={action.label}
                onPress={action.onPress}
                fillTone={action.fillTone ?? 'primary'}
                textTone={action.textTone ?? 'onPrimary'}
                style={styles.actionGrow}
              />
            ))}
          </ThemedContainer>
        </ThemedContainer>
      </ThemedContainer>
    </Modal>
  )
}
