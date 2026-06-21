import { Pressable, View, Modal, TextInput, FlatList } from 'react-native'
import type { ComponentType } from 'react'
import { styles } from './style'
import { Search, X } from 'lucide-react-native'
import { useCategory } from '@/hooks/category/useCategory'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/ui/ThemedText'
import { resolveTextTone } from '@/utils/textTone'
import { ThemedButton } from '@/components/ui/ThemedButton'

type IconProps = { size?: number; color?: string; strokeWidth?: number }

type IconItem = {
  key: string
  label: string
  Icon: ComponentType<IconProps>
}

type Props = {
  visible: boolean
  onClose: () => void
  onSelect: (value: string) => void
  categoryColor: string
}

export function ThemedIconPicker({ visible, onClose, onSelect, categoryColor }: Props) {
  const colors = useThemeColor()
  const { iconQuery, setIconQuery, selectedIcon, setSelectedIcon, filteredIcons } = useCategory()

  const renderItem = ({ item }: { item: IconItem }) => {
    const isSelected = selectedIcon === item.key
    const IconComponent = item.Icon

    return (
      <Pressable
        onPress={() => setSelectedIcon(item.key)}
        style={[styles.iconCell, isSelected && styles.iconCellSelected]}
      >
        <View style={[styles.iconCircle, { backgroundColor: colors.surfaceMuted }]}>
          <IconComponent
            size={36}
            strokeWidth={isSelected ? 2.5 : 2}
            color={isSelected ? categoryColor : colors.mutedForeground}
          />
        </View>
      </Pressable>
    )
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.background }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <ThemedText children text="Selecionar um icone" variant="bodyLarge" />
            <Pressable onPress={onClose} hitSlop={10}>
              <X size={24} color={colors.foreground} />
            </Pressable>
          </View>

          <View style={[styles.searchBox, { backgroundColor: colors.surfaceMuted }]}>
            <Search size={18} color={resolveTextTone(colors, 'default')} />
            <TextInput
              value={iconQuery}
              onChangeText={setIconQuery}
              placeholder="Buscar ícone..."
              placeholderTextColor={resolveTextTone(colors, 'muted')}
              style={[styles.searchInput, { color: resolveTextTone(colors, 'default') }]}
            />
          </View>

          <FlatList
            data={filteredIcons}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            numColumns={4}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
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
                onSelect(selectedIcon)
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
