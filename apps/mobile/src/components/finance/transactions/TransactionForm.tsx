import { ScrollView, StyleSheet, View } from 'react-native'
import { AlertCircle, Calendar, CreditCard, Landmark, Pencil, Tag } from 'lucide-react-native'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  useTransactionFormScreen,
  type TransactionFormMode,
  type TransactionInitialValues,
} from '@/hooks/transactions/useTransactionFormScreen'
import { TRANSACTION_FORM_COPY } from '@/utils/transactionForm'
import { formatDateTimeShort } from '@/utils/formatters'
import { ACCOUNTS } from './types'
import { TransactionTypeTabs } from './TransactionTypeTabs'
import { AmountDisplay } from './AmountDisplay'
import { NumericKeypad } from './NumericKeypad'
import { FormField } from './FormField'
import { SubcategoryChips } from './SubcategoryChips'
import { PickerModal } from './PickerModal'

type Props = {
  title?: string
  mode?: TransactionFormMode
  initialValues?: TransactionInitialValues
  onSuccess?: () => void
}

export function TransactionForm({ title, mode, initialValues, onSuccess }: Props) {
  const theme = useThemeColor()
  const {
    form,
    title: resolvedTitle,
    submitLabel,
    successTitle,
    successMessage,
    categories,
    selectedAccount,
    selectedDestination,
    selectedCategory,
    destinationOptions,
    showAccountPicker,
    setShowAccountPicker,
    showDestinationPicker,
    setShowDestinationPicker,
    showCategoryPicker,
    setShowCategoryPicker,
    successAlertVisible,
    dismissSuccessAlert,
    handleSubmit,
    openRecorrencias,
  } = useTransactionFormScreen({ title, mode, initialValues, onSuccess })

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText text={resolvedTitle} variant="headline" style={styles.title} />
      </View>

      <TransactionTypeTabs
        value={form.type}
        onChange={form.handleTypeChange}
        onRecorrencias={openRecorrencias}
      />

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
        {form.submitAttempted && form.errors.amount ? (
          <ThemedFieldError message={form.errors.amount} visible />
        ) : null}

        <View style={[styles.fields, { backgroundColor: theme.surfaceMuted }]}>
          <FormField
            icon={CreditCard}
            label={form.type === 'TRANSFER' ? 'De Conta' : 'Conta'}
            value={selectedAccount?.label ?? ''}
            onPress={() => setShowAccountPicker(true)}
          />

          {form.type === 'TRANSFER' && (
            <FormField
              icon={Landmark}
              label="Para Conta"
              value={selectedDestination?.label ?? ''}
              onPress={() => setShowDestinationPicker(true)}
              error={form.submitAttempted ? form.errors.destinationAccount : undefined}
            />
          )}

          {form.type !== 'TRANSFER' && (
            <FormField
              icon={Tag}
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
            icon={Calendar}
            label="Data e Hora"
            value={formatDateTimeShort(new Date())}
            onPress={() => {}}
          />

          <FormField
            icon={Pencil}
            label="Notas"
            value={form.notes}
            isInput
            isLast
            onChangeText={form.setNotes}
            placeholder={TRANSACTION_FORM_COPY.notesPlaceholder}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: `${theme.mutedForeground}25` }]}>
        {form.submitError && (
          <View style={styles.errorRow}>
            <AlertCircle size={18} color={theme.destructive} />
            <ThemedText
              text={form.submitError}
              variant="caption"
              tone="destructive"
              style={styles.errorText}
            />
          </View>
        )}
        <ThemedButton
          title={submitLabel}
          disabled={form.submitting}
          onPress={handleSubmit}
          style={styles.submitButton}
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

      <ThemedOverlayAlert
        visible={successAlertVisible}
        onRequestClose={dismissSuccessAlert}
        message={successMessage}
        actions={[{ label: 'OK', onPress: dismissSuccessAlert }]}
      >
        <ThemedText
          variant="headline"
          text={successTitle}
          style={{ textAlign: 'center', width: '100%' }}
        />
      </ThemedOverlayAlert>
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
    gap: 10,
  },
  submitButton: {
    width: '100%',
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
  },
})
