import { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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

  const handleSubmit = () => {
    form.submit(() => {
      // CA10: confirmação de sucesso
      Alert.alert('Registro salvo!', 'Sua transação foi registrada com sucesso.', [
        { text: 'OK', onPress: onSuccess },
      ])
    })
  }
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
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
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
        {form.submitAttempted && form.errors.amount && (
          <Text style={styles.amountError}>{form.errors.amount}</Text>
        )}

        <View style={[styles.fields, { backgroundColor: theme.surfaceMuted }]}>
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
              error={form.submitAttempted ? form.errors.destinationAccount : undefined}
            />
          )}

          {form.type !== 'TRANSFER' && (
            <FormField
              icon="category"
              label="Categoria"
              value={selectedCategory?.label ?? ''}
              onPress={() => setShowCategoryPicker(true)}
              error={form.submitAttempted ? form.errors.category : undefined}
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

      <View style={[styles.footer, { borderTopColor: `${theme.mutedForeground}25` }]}>
        {form.submitError && (
          <View style={styles.errorRow}>
            <MaterialIcons name="error-outline" size={18} color="#f2685a" />
            <Text style={styles.errorText}>{form.submitError}</Text>
          </View>
        )}
        <ButtonPrimary
          title={form.submitting ? 'Salvando...' : 'Adicionar Registro'}
          disabled={form.submitting}
          onPress={handleSubmit}
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
  amountError: {
    fontSize: 12,
    color: '#f2685a',
    textAlign: 'center',
    marginTop: -16,
    marginBottom: 8,
  } as TextStyle,
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
