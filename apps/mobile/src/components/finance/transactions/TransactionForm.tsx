import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { AlertCircle, Calendar, CreditCard, Landmark, Pencil, Tag } from 'lucide-react-native'
import { router } from 'expo-router'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { ThemedText } from '@/components/ui/ThemedText'
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
  const [successAlertVisible, setSuccessAlertVisible] = useState(false)

  const dismissSuccessAlert = () => {
    setSuccessAlertVisible(false)
    onSuccess?.()
  }

  const handleSubmit = () => {
    form.submit(() => {
      setSuccessAlertVisible(true)
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
        <ThemedText text={title} variant="headline" style={styles.title} />
      </View>

      <TransactionTypeTabs
        value={form.type}
        onChange={form.handleTypeChange}
        onRecorrencias={() => router.push('/recorrencia')}
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
            placeholder="Adicionar nota..."
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

      <ThemedOverlayAlert
        visible={successAlertVisible}
        onRequestClose={dismissSuccessAlert}
        message="Sua transação foi registrada com sucesso."
        actions={[{ label: 'OK', onPress: dismissSuccessAlert }]}
      >
        <ThemedText
          variant="headline"
          text="Registro salvo!"
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
