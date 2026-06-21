// apps/mobile/src/components/finance/transactions/PickerModal.tsx
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useColors } from '@/hooks/useColors'
import type { IconKey } from '@/utils/icons'

type Option = {
  id: string
  label: string
  icon: IconKey | string
  color?: string
}

type Props = {
  visible: boolean
  title: string
  options: Option[]
  selectedId: string
  onSelect: (id: string) => void
  onClose: () => void
}

export function PickerModal({ visible, title, options, selectedId, onSelect, onClose }: Props) {
  const theme = useThemeColor()
  const { withOpacity } = useColors()

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: theme.surfaceMuted }]}>
        <View style={[styles.sheetHeader, { borderBottomColor: `${theme.mutedForeground}30` }]}>
          <ThemedText text={title} variant="title" style={styles.sheetTitle} />
          <Pressable onPress={onClose} hitSlop={12}>
            <AppIcon name="x" size={22} color={theme.mutedForeground} />
          </Pressable>
        </View>

        <ScrollView>
          {options.map((item) => {
            const selected = item.id === selectedId
            const optionColor = item.color ?? theme.primary

            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  onSelect(item.id)
                  onClose()
                }}
                style={({ pressed }) => [
                  styles.option,
                  selected && { backgroundColor: withOpacity(optionColor, 0.12) },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <View
                  style={[styles.optionIcon, { backgroundColor: withOpacity(optionColor, 0.17) }]}
                >
                  <AppIcon name={item.icon} size={18} color={optionColor} />
                </View>

                <ThemedText
                  text={item.label}
                  variant="body"
                  style={[styles.optionLabel, { textAlign: 'left' }]}
                />

                {selected && (
                  <AppIcon name="check" size={18} color={optionColor} strokeWidth={2.5} />
                )}
              </Pressable>
            )
          })}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 36,
    maxHeight: '55%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginVertical: 2,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 15,
    flex: 1,
  },
})
