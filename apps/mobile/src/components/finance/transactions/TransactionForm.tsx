import { ScrollView, StyleSheet, View } from 'react-native'
import {
  useTransactionFormScreen,
  type TransactionFormMode,
  type TransactionInitialValues,
} from '@/hooks/transactions/useTransactionFormScreen'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { CreditCard, Landmark, Tag, Calendar, Pencil, AlertCircle } from 'lucide-react-native'
import { TRANSACTION_FORM_COPY } from '@/utils/transactionForm'
import { FormField } from './FormField'
import { AmountDisplay } from './AmountDisplay'
import { NumericKeypad } from './NumericKeypad'
import { TransactionTypeTabs } from './TransactionTypeTabs'
import { SubcategoryChips } from './SubcategoryChips'
import { PickerModal } from './PickerModal'
import { DatePickerModal } from '@/components/ui/DatePickerModal'

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
    selectedInstitution,
    selectedDestinationInstitution,
    selectedCategory,
    destinationOptions,
    showInstitutionPicker,
    setShowInstitutionPicker,
    showDestinationPicker,
    setShowDestinationPicker,
    showCategoryPicker,
    setShowCategoryPicker,
    showDatePicker,
    setShowDatePicker,
    successAlertVisible,
    dismissSuccessAlert,
    handleSubmit,
    openRecorrencias,
    institutionOptions,
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
            label={form.type === 'TRANSFER' ? 'Da Instituição' : 'Instituição'}
            value={selectedInstitution?.label ?? 'Selecionar...'}
            onPress={() => setShowInstitutionPicker(true)}
            error={form.submitAttempted ? form.errors.institution : undefined}
          />

          {form.type === 'TRANSFER' && (
            <FormField
              icon={Landmark}
              label="Para Instituição"
              value={selectedDestinationInstitution?.label ?? 'Selecionar...'}
              onPress={() => setShowDestinationPicker(true)}
              error={form.submitAttempted ? form.errors.destinationInstitution : undefined}
            />
          )}

          {form.type !== 'TRANSFER' && (
            <FormField
              icon={Tag}
              label="Categoria"
              value={selectedCategory?.label ?? 'Selecionar...'}
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
            value={formatDateTimeShort(form.date)}
            onPress={() => setShowDatePicker(true)}
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
        visible={showInstitutionPicker}
        title="Selecionar Instituição"
        options={institutionOptions}
        selectedId={form.institutionId}
        onSelect={form.setInstitutionId}
        onClose={() => setShowInstitutionPicker(false)}
      />

      <PickerModal
        visible={showDestinationPicker}
        title="Instituição Destino"
        options={destinationOptions}
        selectedId={form.destinationInstitutionId}
        onSelect={form.setDestinationInstitutionId}
        onClose={() => setShowDestinationPicker(false)}
      />

      <PickerModal
        visible={showCategoryPicker}
        title="Selecionar Categoria"
        options={categories}
        selectedId={form.categoryId ? form.categoryId : '123'}
        onSelect={form.setCategoryId}
        onClose={() => setShowCategoryPicker(false)}
      />

      <DatePickerModal
        visible={showDatePicker}
        value={form.date}
        onConfirm={(date) => {
          form.setDate(date)
          setShowDatePicker(false)
        }}
        onCancel={() => setShowDatePicker(false)}
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

const formatDateTimeShort = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)

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
