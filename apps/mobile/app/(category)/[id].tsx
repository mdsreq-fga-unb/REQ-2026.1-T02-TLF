import { ThemedColorPicker } from '@/components/category/ThemedColorPicker'
import { ThemedIconPicker } from '@/components/category/ThemedIconPicker'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useCategory } from '@/hooks/category/useCategory'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useColors } from '@/hooks/useColors'

export default function EditCategoryScreen() {
  const params = useLocalSearchParams()
  const {
    CATEGORYS,
    colorPickerVisible,
    setColorPickerVisible,
    categoryColor,
    setCategoryColor,
    iconPickerVisible,
    setIconPickerVisible,
    setIcon,
  } = useCategory()

  const { withOpacity } = useColors()

  const id = String(params.id ?? '')
  const selectedCategory = CATEGORYS.find((c) => c.id === id)
  if (!selectedCategory) {
    return (
      <ThemedBackground>
        <ThemedText
          text="Erro: categoria não foi passada corretamente"
          variant="display"
          tone="warning"
        />
      </ThemedBackground>
    )
  }
  const insets = useSafeAreaInsets()

  return (
    <ThemedBackground>
      <ThemedText children text="Categoria" style={{ alignSelf: 'flex-start' }} />
      <ThemedListItem
        text="Cor"
        variant="title"
        icon={selectedCategory.icon.Icon}
        start="right"
        iconColor={selectedCategory.color.color}
        iconSize="xxlg"
        boxType="round"
        boxColor={selectedCategory.color.color}
        filled="filled"
        onPress={() => setColorPickerVisible(true)}
      />
      <ThemedListItem
        text="Icone"
        variant="title"
        icon={selectedCategory.icon.Icon}
        start="right"
        iconColor={selectedCategory.color.color}
        iconSize="xxlg"
        boxType="round"
        boxColor={withOpacity(selectedCategory.color.color, 0.17)}
        filled="filled"
        onPress={() => setIconPickerVisible(true)}
      />
      <ThemedIconPicker
        visible={iconPickerVisible}
        onClose={() => setIconPickerVisible(false)}
        onSelect={(value) => setIcon(value)}
        categoryColor={categoryColor}
      />
      <ThemedColorPicker
        visible={colorPickerVisible}
        onClose={() => setColorPickerVisible(false)}
        onSelect={(value) => setCategoryColor(value)}
      />
      <ThemedSeparator />
      <ThemedText
        children
        text="Subcategorias"
        variant="body"
        style={{ alignSelf: 'flex-start' }}
      />
      <ThemedText
        children
        text="TODO: terminar quando subcategorias forem implementadas"
        variant="body"
        tone="muted"
        style={{ alignSelf: 'flex-start' }}
      />
      <ThemedSeparator />
      <ThemedButton
        title="Salvar mudanças"
        style={{ width: '90%', position: 'absolute', bottom: insets.bottom + 75 }}
      />
      <ThemedButton
        title="Excluir categoria"
        fillTone="destructive"
        style={{ width: '90%', position: 'absolute', bottom: insets.bottom + 10 }}
      />
    </ThemedBackground>
  )
}
