import React from 'react'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { AmountDisplay } from '@/components/finance/transactions/AmountDisplay'
import { FormField } from '@/components/finance/transactions/FormField'
import { NumericKeypad } from '@/components/finance/transactions/NumericKeypad'
import { PickerModal } from '@/components/finance/transactions/PickerModal'
import { CATEGORIES } from '@/components/finance/transactions/types'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedText } from '@/components/ui/ThemedText'
import { BudgetInitialValues, useBudgetForm } from '@/hooks/budget/useBudgetScreen'
import { useThemeColor } from '@/hooks/useThemeColor'
import { View, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type Props = {
  title?: string
  initialValues?: BudgetInitialValues
}

export default function EditBudgetPage({ initialValues }: Props) {
  const theme = useThemeColor()
  const form = useBudgetForm(initialValues)

  const categories = CATEGORIES['EXPENSE']
  const selectedCategory = categories.find((c) => c.id === form.categoryId)

  return (
    <ThemedBackground>
      <View style={{ width: '100%' }}>
        {/* <View style={styles.header}>
          <ThemedText
            children
            text={`Editar ${form.type == 'BUDGET' ? 'Orçamento' : 'Meta'}`}
            variant="title"
          />
        </View>
        <BudgetTypeTabs value={form.type} onChange={form.handleTypeChange} /> */}
        <ScrollView>
          <AmountDisplay
            amountCents={form.amountLimit}
            type={form.type}
            onPress={() => form.setShowKeypad(true)}
          />
          {form.submitAttempted && form.errors.amount && (
            <ThemedText children text={form.errors.amount} tone="warning" />
          )}
          <View style={[styles.fields, { backgroundColor: theme.surfaceMuted }]}>
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
        <View style={[styles.footer, { borderTopColor: `${theme.mutedForeground}25` }]}>
          {form.submitError && (
            <View style={styles.errorRow}>
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
              void form.handleSubmit()
            }}
          />
        </View>
      </View>
    </ThemedBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  amountError: {
    fontSize: 12,
    color: '#f2685a',
    textAlign: 'center',
    marginTop: -16,
    marginBottom: 8,
  },
  fields: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginTop: 15,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: 10,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#f2685a',
  },
})
