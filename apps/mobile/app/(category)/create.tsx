import { ThemedColorPicker } from '@/components/category/ThemedColorPicker'
import { ThemedIconPicker } from '@/components/category/ThemedIconPicker'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useCategory } from '@/hooks/category/useCategory'
import { useColors } from '@/hooks/useColors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CreateCategoryScreen() {
  const {
    colorPickerVisible,
    setColorPickerVisible,
    categoryColor,
    setCategoryColor,
    iconPickerVisible,
    setIconPickerVisible,
    icon,
    setIcon,
    iconComponent,
    name,
    setName,
    nameTouched,
    setNameTouched,
    isFormValid,
    handleCreateSubmit,
  } = useCategory()

  const { withOpacity } = useColors()

  const insets = useSafeAreaInsets()

  return (
    <ThemedBackground>
      <ThemedText children text="Categoria" style={{ alignSelf: 'flex-start' }} />
      <ThemedContainer>
        <ThemedInputContainer text="Nome">
          <ThemedInputForm
            placeholder="Nova categoria"
            onChangeText={setName}
            autoCapitalize="words"
            value={name}
            onBlur={() => {
              setNameTouched(true)
            }}
          />
          <ThemedFieldError
            message={isFormValid ? '' : 'Insira um nome unico para a categoria'}
            visible={nameTouched}
          />
        </ThemedInputContainer>
      </ThemedContainer>
      <ThemedListItem
        text="Cor"
        variant="title"
        icon={iconComponent}
        start="right"
        iconColor={categoryColor}
        iconSize="xxlg"
        boxType="round"
        boxColor={categoryColor}
        filled="filled"
        onPress={() => setColorPickerVisible(true)}
      />
      <ThemedListItem
        text="Icone"
        variant="title"
        icon={iconComponent}
        start="right"
        iconColor={categoryColor}
        iconSize="xxlg"
        boxType="round"
        boxColor={withOpacity(categoryColor, 0.17)}
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
        title="Adicionar categoria"
        style={{ width: '90%', position: 'absolute', bottom: insets.bottom + 10 }}
        onPress={() => handleCreateSubmit(name, icon, categoryColor)}
      />
    </ThemedBackground>
  )
}
