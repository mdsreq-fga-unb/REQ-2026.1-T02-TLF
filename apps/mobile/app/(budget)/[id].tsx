import React, { useEffect } from 'react'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { AmountDisplay } from '@/components/finance/transactions/AmountDisplay'
import { FormField } from '@/components/finance/transactions/FormField'
import { NumericKeypad } from '@/components/finance/transactions/NumericKeypad'
import { PickerModal } from '@/components/finance/transactions/PickerModal'
import { CATEGORIES } from '@/components/finance/transactions/types'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedText } from '@/components/ui/ThemedText'
import { BudgetInitialValues, useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useThemeColor } from '@/hooks/useThemeColor'
import { View, ScrollView } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'

type Props = {
  title?: string
  initialValues?: BudgetInitialValues
}

export default function EditBudgetPage({ initialValues }: Props) {
  const theme = useThemeColor()
  const form = useBudgetScreen(initialValues)
  const params = useLocalSearchParams<{ id?: string }>()
  const id = String(params.id ?? '')
  const categories = CATEGORIES['EXPENSE']
  const selectedCategory = categories.find((c) => c.id === form.categoryId)

  useEffect(() => {
    if (id) {
      form.fetchBudget(id)
    }
  }, [id])

  return (
    <ThemedBackground>
      <View style={{ width: '100%' }}>
        <ScrollView>
          <AmountDisplay
            amountCents={form.amountLimit}
            type={form.type}
            onPress={() => form.setShowKeypad(true)}
          />
          {form.submitAttempted && form.errors.amount && (
            <ThemedText children text={form.errors.amount} tone="warning" />
          )}
          <View
            style={{
              backgroundColor: theme.surfaceMuted,
              width: '100%',
              borderRadius: 16,
              padding: 16,
              marginTop: 15,
            }}
          >
            <FormField
              isInput
              icon="bookmark"
              value={form.name}
              label="Nome"
              placeholder="Nome"
              onChangeText={form.setName}
            />

            <FormField
              icon="category"
              label="Categoria"
              value={selectedCategory?.label ?? ''}
              onPress={() => form.setShowCategoryPicker(true)}
              error={form.submitAttempted ? form.errors.category : undefined}
            />

            <FormField
              icon="attach-money"
              label={form.type == 'BUDGET' ? 'Limite' : 'Meta'}
              value={form.amount}
              onPress={() => {}}
              onChangeText={(text: string) => form.setAmountLimit(Number(text))}
            />
          </View>
          <NumericKeypad
            visible={form.showKeypad}
            amountCents={form.amountLimit}
            type={'TRANSFER'}
            onKeyPress={form.handleKeypad}
            onSave={() => form.setShowKeypad(false)}
          />

          <PickerModal
            visible={form.showCategoryPicker}
            title="Selecionar Categoria"
            options={categories}
            selectedId={form.categoryId}
            onSelect={form.setCategoryId}
            onClose={() => form.setShowCategoryPicker(false)}
          />
        </ScrollView>
        <View
          style={{
            borderTopColor: `${theme.mutedForeground}25`,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderTopWidth: 1,
            alignItems: 'center',
            gap: 10,
          }}
        >
          {form.submitError && (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'stretch' }}
            >
              <MaterialIcons name="error-outline" size={18} color="#f2685a" />
              {form.submitAttempted && form.errors.category && (
                <ThemedText children text={form.errors.category} tone="warning" />
              )}
            </View>
          )}
          <ThemedButton
            title={form.submitting ? 'Salvando...' : 'Salvar'}
            disabled={form.submitting || !form.isValid}
            onPress={() => {
              void form.handleEditSubmit(id, () => {
                router.back()
              })
            }}
          />
        </View>
      </View>
      <ThemedOverlayAlert
        visible={form.feedbackMessage != null}
        onRequestClose={form.dismissFeedback}
        message={form.feedbackMessage ?? ''}
        actions={[{ label: 'Entendi', onPress: form.dismissFeedback }]}
      >
        <ThemedText
          variant="headline"
          text="Erro ao Editar"
          style={{ textAlign: 'center', width: '100%' }}
        />
      </ThemedOverlayAlert>
    </ThemedBackground>
  )
}
