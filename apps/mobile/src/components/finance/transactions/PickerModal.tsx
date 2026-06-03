import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'

type Option = {
  id: string
  label: string
  icon: IconKey | string
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
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  onSelect(item.id)
                  onClose()
                }}
                style={({ pressed }) => [
                  styles.option,
                  selected && { backgroundColor: `${theme.primary}18` },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <View style={[styles.optionIcon, { backgroundColor: `${theme.primary}20` }]}>
                  <AppIcon
                    name={item.icon}
                    size={18}
                    color={selected ? theme.primary : theme.mutedForeground}
                  />
                </View>
                <ThemedText text={item.label} variant="body" style={styles.optionLabel} />
                {selected && (
                  <AppIcon name="check" size={18} color={theme.primary} strokeWidth={2.5} />
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
