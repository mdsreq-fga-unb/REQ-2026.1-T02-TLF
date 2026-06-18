import { useEffect } from 'react'
import { ThemedColorPicker } from '@/components/category/ThemedColorPicker'
import { ThemedIconPicker } from '@/components/category/ThemedIconPicker'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedListItem } from '@/components/ui/ThemedListItem'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useCategory } from '@/hooks/category/useCategory'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useColors } from '@/hooks/useColors'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { deleteCategory } from '@/services/api/category'
import { ActivityIndicator } from 'react-native'

export default function EditCategoryScreen() {
  const params = useLocalSearchParams()
  const {
    mappedCategories,
    colorPickerVisible,
    setColorPickerVisible,
    categoryColor,
    setCategoryColor,
    iconPickerVisible,
    setIconPickerVisible,
    icon,
    setIcon,
    name,
    setName,
    nameTouched,
    setNameTouched,
    isFormValid,
    iconComponent,
    feedbackMessage,
    setFeedbackMessage,
    dismissFeedback,
    handleEditSubmit,
    loading,
  } = useCategory()

  const { withOpacity } = useColors()

  const id = String(params.id ?? '')
  const isEditing = !!id
  const selectedCategory = mappedCategories.find((c) => c.id === id)

  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (selectedCategory) {
      setCategoryColor(selectedCategory.colorHex)
      setIcon(selectedCategory.icon)
      setName(selectedCategory.name)
    }
  }, [selectedCategory])

  if (isEditing && (loading || !selectedCategory)) {
    return (
      <ThemedBackground>
        <ActivityIndicator />
      </ThemedBackground>
    )
  }

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
        title="Salvar mudanças"
        style={{ width: '90%', position: 'absolute', bottom: insets.bottom + 75 }}
        onPress={() => handleEditSubmit(id, name, icon, categoryColor)}
      />
      <ThemedButton
        title="Excluir categoria"
        fillTone="destructive"
        style={{ width: '90%', position: 'absolute', bottom: insets.bottom + 10 }}
        onPress={() => setFeedbackMessage('Você tem certeza que deseja excluir esse item?')}
      />
      <ThemedOverlayAlert
        visible={feedbackMessage != null}
        onRequestClose={dismissFeedback}
        message={feedbackMessage ?? ''}
        actions={[
          { label: 'Cancelar', onPress: dismissFeedback },
          {
            label: 'Confirmar',
            onPress: async () => {
              try {
                await deleteCategory(id)
                dismissFeedback()
                router.back()
              } catch (deleteError) {
                console.error('Erro ao excluir orçamento:', deleteError)
                setFeedbackMessage('Não foi possível excluir o orçamento. Tente novamente.')
              }
            },
          },
        ]}
      />
    </ThemedBackground>
  )
}
