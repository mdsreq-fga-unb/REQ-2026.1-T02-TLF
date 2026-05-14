import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { ComponentProps } from 'react'

type Option = {
  id: string
  label: string
  icon: string
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
      <View style={[styles.sheet, { backgroundColor: theme.gray }]}>
        <View style={[styles.sheetHeader, { borderBottomColor: `${theme.graySecondary}30` }]}>
          <Text style={[styles.sheetTitle, { color: theme.text }]}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <MaterialIcons name="close" size={22} color={theme.graySecondary} />
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
                  selected && { backgroundColor: `${theme.bluePrimary}18` },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <View style={[styles.optionIcon, { backgroundColor: `${theme.bluePrimary}20` }]}>
                  <MaterialIcons
                    name={item.icon as ComponentProps<typeof MaterialIcons>['name']}
                    size={18}
                    color={selected ? theme.bluePrimary : theme.graySecondary}
                  />
                </View>
                <Text style={[styles.optionLabel, { color: theme.text }]}>{item.label}</Text>
                {selected && (
                  <MaterialIcons
                    name="check"
                    size={18}
                    color={theme.bluePrimary}
                    style={styles.checkIcon}
                  />
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
  checkIcon: {
    marginLeft: 'auto',
  },
})
