import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useTransactionForm, type TransactionInitialValues } from '@/hooks/useTransactionForm'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { formatDateTimeShort } from '@/utils/formatters'
import { ACCOUNTS, CATEGORIES } from './types'
import { TransactionTypeTabs } from './TransactionTypeTabs'
import { AmountDisplay } from './AmountDisplay'
import { NumericKeypad } from './NumericKeypad'
import { FormField } from './FormField'
import { SubcategoryChips } from './SubcategoryChips'
import { PickerModal } from './PickerModal'

type Props = {
  title?: string
  initialValues?: TransactionInitialValues
  onSuccess?: () => void
}

export function TransactionForm({ title = 'Adicionar Registro', initialValues, onSuccess }: Props) {
  const theme = useThemeColor()
  const form = useTransactionForm(initialValues)
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [showDestinationPicker, setShowDestinationPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const categories = CATEGORIES[form.type]
  const selectedAccount = ACCOUNTS.find((a) => a.id === form.accountId)
  const selectedDestination = ACCOUNTS.find((a) => a.id === form.destinationAccountId)
  const selectedCategory = categories.find((c) => c.id === form.categoryId)
  const destinationOptions = ACCOUNTS.filter((a) => a.id !== form.accountId)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>

      <TransactionTypeTabs value={form.type} onChange={form.handleTypeChange} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AmountDisplay
          amountCents={form.amountCents}
          type={form.type}
          onPress={() => form.setShowKeypad(true)}
        />

        <View style={[styles.fields, { backgroundColor: theme.gray }]}>
          <FormField
            icon="credit-card"
            label={form.type === 'TRANSFER' ? 'De Conta' : 'Conta'}
            value={selectedAccount?.label ?? ''}
            onPress={() => setShowAccountPicker(true)}
          />

          {form.type === 'TRANSFER' && (
            <FormField
              icon="account-balance"
              label="Para Conta"
              value={selectedDestination?.label ?? ''}
              onPress={() => setShowDestinationPicker(true)}
            />
          )}

          {form.type !== 'TRANSFER' && (
            <FormField
              icon="category"
              label="Categoria"
              value={selectedCategory?.label ?? ''}
              onPress={() => setShowCategoryPicker(true)}
            />
          )}

          {form.type !== 'TRANSFER' && form.categoryId !== '' && (
            <SubcategoryChips
              type={form.type}
              categoryId={form.categoryId}
              selectedId={form.subcategoryId}
              onSelect={form.setSubcategoryId}
            />
          )}

          <FormField
            icon="calendar-today"
            label="Data e Hora"
            value={formatDateTimeShort(new Date())}
            onPress={() => {}}
          />

          <FormField
            icon="edit"
            label="Notas"
            value={form.notes}
            isInput
            isLast
            onChangeText={form.setNotes}
            placeholder="Adicionar nota..."
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: `${theme.graySecondary}25` }]}>
        <ButtonPrimary
          title={form.submitting ? 'Salvando...' : 'Adicionar Registro'}
          disabled={!form.isValid || form.submitting}
          onPress={() => form.submit(onSuccess)}
        />
      </View>

      <NumericKeypad
        visible={form.showKeypad}
        amountCents={form.amountCents}
        type={form.type}
        onKeyPress={form.handleKeypad}
        onSave={() => form.setShowKeypad(false)}
      />

      <PickerModal
        visible={showAccountPicker}
        title="Selecionar Conta"
        options={ACCOUNTS}
        selectedId={form.accountId}
        onSelect={form.setAccountId}
        onClose={() => setShowAccountPicker(false)}
      />

      <PickerModal
        visible={showDestinationPicker}
        title="Conta Destino"
        options={destinationOptions}
        selectedId={form.destinationAccountId}
        onSelect={form.setDestinationAccountId}
        onClose={() => setShowDestinationPicker(false)}
      />

      <PickerModal
        visible={showCategoryPicker}
        title="Selecionar Categoria"
        options={categories}
        selectedId={form.categoryId}
        onSelect={form.setCategoryId}
        onClose={() => setShowCategoryPicker(false)}
      />
    </View>
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
  fields: {
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
})
