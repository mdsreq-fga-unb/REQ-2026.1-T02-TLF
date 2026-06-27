import { useCategory } from '@/hooks/category/useCategory'
import { X } from 'lucide-react-native'
import { Pressable, View, Modal, FlatList } from 'react-native'
import { styles } from './style'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { useThemeColor } from '@/hooks/useThemeColor'

type Props = {
  visible: boolean
  onClose: () => void
  onSelect: (color: string) => void
  initialValue?: string
}

type ColorItem = {
  key: string
  label: string
  color: string
}

export function ThemedColorPicker({ visible, onClose, onSelect }: Props) {
  const colors = useThemeColor()
  const { COLORS, categoryColor, setCategoryColor } = useCategory()

  const renderItem = ({ item }: { item: ColorItem }) => {
    const isSelected = categoryColor === item.color

    return (
      <Pressable onPress={() => setCategoryColor(item.color)} style={styles.colorCell}>
        <View
          style={[
            styles.colorCircle,
            { backgroundColor: item.color },
            isSelected && styles.colorCircleSelected,
          ]}
        />
      </Pressable>
    )
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.background }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <ThemedText children text="Selecionar uma cor" variant="bodyLarge" />
            <Pressable onPress={onClose} hitSlop={10}>
              <X size={24} color={colors.foreground} />
            </Pressable>
          </View>

          <FlatList
            data={COLORS}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            numColumns={4}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingTop: 10 }}
            nestedScrollEnabled
          />

          <View style={styles.footer}>
            <ThemedButton
              title="cancelar"
              onPress={onClose}
              style={{ width: '45%', backgroundColor: colors.destructive }}
            />
            <ThemedButton
              title="Salvar"
              onPress={() => {
                onSelect(categoryColor)
                onClose()
              }}
              style={{ width: '45%' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
