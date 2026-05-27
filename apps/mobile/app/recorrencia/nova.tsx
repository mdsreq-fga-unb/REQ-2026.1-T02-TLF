import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { EditScopeModal } from '@/components/finance/recurrences/EditScopeModal'
import type { EditScope } from '@/components/finance/recurrences/EditScopeModal'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  mockAccounts,
  mockCategories,
  getCategory,
  getSubcategoriesForCategory,
} from '@/components/finance/recurrences/recurrences-data'
import { AmountDisplay } from '@/components/finance/transactions/AmountDisplay'
import { NumericKeypad } from '@/components/finance/transactions/NumericKeypad'
import { DatePickerModal } from '@/components/ui/DatePickerModal'
import type { RecurrenceFrequency, RecurrenceType } from '@/components/finance/recurrences/types'
import type { TransactionType } from '@/services/database/queries/transaction'
import type { ComponentProps } from 'react'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

const GREEN = '#00E383'
const RED = '#FF4B4B'
const MAX_CENTS = 9_999_999

const NO_SUBCATEGORY = ''

const parseISODate = (iso?: string): Date | null => {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const formatDateDisplay = (date: Date | null): string => {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}/${m}/${date.getFullYear()}`
}

const frequencyOptions = [
  { label: 'Diária', value: 'DAILY' },
  { label: 'Semanal', value: 'WEEKLY' },
  { label: 'Quinzenal', value: 'BIWEEKLY' },
  { label: 'Mensal', value: 'MONTHLY' },
  { label: 'Anual', value: 'YEARLY' },
]

type Errors = Partial<Record<string, string>>

export default function NovaRecorrenciaScreen() {
  const theme = useThemeColor()
  const params = useLocalSearchParams<{
    id?: string
    description?: string
    amount?: string
    type?: RecurrenceType
    frequency?: RecurrenceFrequency
    dueDay?: string
    accountId?: string
    categoryId?: string
    subcategoryId?: string
    startDate?: string
    isActive?: string
  }>()

  const isEditing = !!params.id

  const [type, setType] = useState<RecurrenceType>(params.type ?? 'EXPENSE')
  const [amountCents, setAmountCents] = useState<number>(() => {
    if (params.amount) {
      const parsed = parseFloat(params.amount.replace(',', '.'))
      return isNaN(parsed) ? 0 : Math.round(parsed * 100)
    }
    return 0
  })
  const [keypadVisible, setKeypadVisible] = useState(false)
  const [description, setDescription] = useState(params.description ?? '')
  const [frequency, setFrequency] = useState<string>(params.frequency ?? 'MONTHLY')
  const [dueDay, setDueDay] = useState(params.dueDay ?? '1')
  const [accountId, setAccountId] = useState(params.accountId ?? mockAccounts[0].id)
  const [categoryId, setCategoryId] = useState(params.categoryId ?? mockCategories[0].id)
  const [subcategoryId, setSubcategoryId] = useState<string>(params.subcategoryId ?? NO_SUBCATEGORY)
  const [startDate, setStartDate] = useState<Date | null>(() => parseISODate(params.startDate))
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isIndeterminate, setIsIndeterminate] = useState(true)
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [isActive, setIsActive] = useState(params.isActive !== '0')
  const [errors, setErrors] = useState<Errors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showEditScopeModal, setShowEditScopeModal] = useState(false)

  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false)
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showSubcategoryPicker, setShowSubcategoryPicker] = useState(false)

  const handleKeypad = (key: string) => {
    setAmountCents((prev) => {
      if (key === 'del') return Math.floor(prev / 10)
      const digit = parseInt(key, 10)
      if (isNaN(digit)) return prev
      const next = prev * 10 + digit
      return next > MAX_CENTS ? prev : next
    })
  }

  const validate = (): boolean => {
    const newErrors: Errors = {}
    if (amountCents <= 0) newErrors.amount = 'Informe um valor maior que zero'
    if (!description.trim()) newErrors.description = 'Campo obrigatório'
    if (!dueDay) newErrors.dueDay = 'Campo obrigatório'
    if (!startDate) newErrors.startDate = 'Campo obrigatório'
    if (!isIndeterminate && !endDate) newErrors.endDate = 'Campo obrigatório'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateField = (field: string, value: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      if (value.trim()) delete next[field]
      else next[field] = 'Campo obrigatório'
      return next
    })
  }

  const handleSave = () => {
    if (!validate()) return
    if (isEditing) {
      setShowEditScopeModal(true)
      return
    }
    showSuccessAndGoBack()
  }

  const handleScopeConfirm = (_scope: EditScope) => {
    setShowEditScopeModal(false)
    showSuccessAndGoBack()
  }

  const showSuccessAndGoBack = () => {
    setShowSuccess(true)
    globalThis.setTimeout(() => {
      setShowSuccess(false)
      router.back()
    }, 1600)
  }

  const isFormValid = isEditing || (amountCents > 0 && !!description.trim() && startDate != null)

  const selectedFrequencyLabel =
    frequencyOptions.find((f) => f.value === frequency)?.label ?? 'Mensal'

  const selectedAccount = mockAccounts.find((a) => a.id === accountId) ?? mockAccounts[0]
  const selectedCategory = getCategory(categoryId) ?? mockCategories[0]
  const subcategoryOptions = getSubcategoriesForCategory(categoryId)
  const selectedSubcategory = subcategoryOptions.find((s) => s.id === subcategoryId)

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <MaterialIcons name="arrow-back" size={22} color={theme.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.foreground }]}>Recorrência</Text>
        <View style={styles.headerBtn} />
      </View>

      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: theme.foreground }]}>
          {isEditing ? 'Editar Recorrência' : 'Nova Recorrência'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
          Configure um pagamento ou recebimento automático.
        </Text>
      </View>

      <View style={[styles.typeTabs, { backgroundColor: theme.surface }]}>
        {(['EXPENSE', 'INCOME'] as RecurrenceType[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setType(t)}
            style={[
              styles.typeTab,
              type === t && { backgroundColor: t === 'EXPENSE' ? RED : GREEN },
            ]}
          >
            <Text
              style={[
                styles.typeTabText,
                { color: type === t ? '#0F0F13' : theme.mutedForeground },
              ]}
            >
              {t === 'EXPENSE' ? 'DESPESA' : 'RECEITA'}
            </Text>
          </Pressable>
        ))}
      </View>

      <AmountDisplay
        amountCents={amountCents}
        type={type as TransactionType}
        onPress={() => setKeypadVisible(true)}
      />
      <Text
        style={[
          styles.errorText,
          { textAlign: 'center', marginTop: -8, display: errors.amount ? 'flex' : 'none' },
        ]}
      >
        {errors.amount ?? ''}
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>DESCRIÇÃO</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            onBlur={() => validateField('description', description)}
            placeholder="Ex: Aluguel, Netflix, Salário..."
            placeholderTextColor={theme.border}
            style={[
              styles.fieldInput,
              { backgroundColor: theme.surface, color: theme.foreground },
              errors.description ? styles.fieldError : null,
            ]}
          />
          <Text style={[styles.errorText, { display: errors.description ? 'flex' : 'none' }]}>
            {errors.description ?? ''}
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>FREQUÊNCIA</Text>
          <Pressable
            onPress={() => setShowFrequencyPicker((v) => !v)}
            style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.dropdownText, { color: theme.foreground }]}>
              {selectedFrequencyLabel}
            </Text>
            <MaterialIcons
              name={showFrequencyPicker ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={22}
              color={theme.mutedForeground}
            />
          </Pressable>
          {showFrequencyPicker && (
            <View style={[styles.pickerList, { backgroundColor: theme.surface }]}>
              {frequencyOptions.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    setFrequency(opt.value)
                    setShowFrequencyPicker(false)
                  }}
                  style={[
                    styles.pickerItem,
                    opt.value === frequency && { backgroundColor: `${GREEN}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.value === frequency ? GREEN : theme.foreground },
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {opt.value === frequency && (
                    <MaterialIcons name="check" size={18} color={GREEN} />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>
            {frequency === 'WEEKLY' ? 'DIA DA SEMANA' : 'DIA DO VENCIMENTO'}
          </Text>
          <Pressable
            onPress={() => setShowDayPicker((v) => !v)}
            style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.dropdownText, { color: theme.foreground, flex: 1 }]}>
              {dueDay ? `Dia ${dueDay}` : 'Selecione'}
            </Text>
            <MaterialIcons
              name={showDayPicker ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={22}
              color={theme.mutedForeground}
            />
          </Pressable>
          {showDayPicker && (
            <View style={[styles.pickerList, { backgroundColor: theme.surface, height: 220 }]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              >
                {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                  <Pressable
                    key={d}
                    onPress={() => {
                      setDueDay(d)
                      setShowDayPicker(false)
                    }}
                    style={[styles.pickerItem, d === dueDay && { backgroundColor: `${GREEN}22` }]}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        { color: d === dueDay ? GREEN : theme.foreground },
                      ]}
                    >
                      Dia {d}
                    </Text>
                    {d === dueDay && <MaterialIcons name="check" size={18} color={GREEN} />}
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
          <Text style={[styles.errorText, { display: errors.dueDay ? 'flex' : 'none' }]}>
            {errors.dueDay ?? ''}
          </Text>
        </View>

        {/* Conta */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>
            {type === 'INCOME' ? 'CONTA DE DESTINO' : 'CONTA DE ORIGEM'}
          </Text>
          <Pressable
            onPress={() => setShowAccountPicker((v) => !v)}
            style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.dropdownText, { color: theme.foreground }]}>
              {selectedAccount.name}
            </Text>
            <MaterialIcons name="unfold-more" size={20} color={theme.mutedForeground} />
          </Pressable>
          {showAccountPicker && (
            <View style={[styles.pickerList, { backgroundColor: theme.surface }]}>
              {mockAccounts.map((opt) => (
                <Pressable
                  key={opt.id}
                  onPress={() => {
                    setAccountId(opt.id)
                    setShowAccountPicker(false)
                  }}
                  style={[
                    styles.pickerItem,
                    opt.id === accountId && { backgroundColor: `${GREEN}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === accountId ? GREEN : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === accountId && <MaterialIcons name="check" size={18} color={GREEN} />}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>CATEGORIA</Text>
          <Pressable
            onPress={() => setShowCategoryPicker((v) => !v)}
            style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.dropdownText, { color: theme.foreground }]}>
              {selectedCategory.name}
            </Text>
            <MaterialIcons
              name={selectedCategory.icon as MaterialIconName}
              size={20}
              color={theme.mutedForeground}
            />
          </Pressable>
          {showCategoryPicker && (
            <View style={[styles.pickerList, { backgroundColor: theme.surface }]}>
              {mockCategories.map((opt) => (
                <Pressable
                  key={opt.id}
                  onPress={() => {
                    setCategoryId(opt.id)
                    setSubcategoryId(NO_SUBCATEGORY)
                    setShowCategoryPicker(false)
                  }}
                  style={[
                    styles.pickerItem,
                    opt.id === categoryId && { backgroundColor: `${GREEN}22` },
                  ]}
                >
                  <MaterialIcons
                    name={opt.icon as MaterialIconName}
                    size={18}
                    color={opt.id === categoryId ? GREEN : theme.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === categoryId ? GREEN : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === categoryId && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color={GREEN}
                      style={{ marginLeft: 'auto' }}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>
            SUBCATEGORIA (OPCIONAL)
          </Text>
          <Pressable
            onPress={() => setShowSubcategoryPicker((v) => !v)}
            style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.dropdownText, { color: theme.foreground, flex: 1 }]}>
              {selectedSubcategory?.name ?? 'Nenhuma'}
            </Text>
            <MaterialIcons
              name={showSubcategoryPicker ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={22}
              color={theme.mutedForeground}
            />
          </Pressable>
          {showSubcategoryPicker && (
            <View style={[styles.pickerList, { backgroundColor: theme.surface }]}>
              <Pressable
                onPress={() => {
                  setSubcategoryId(NO_SUBCATEGORY)
                  setShowSubcategoryPicker(false)
                }}
                style={[
                  styles.pickerItem,
                  subcategoryId === NO_SUBCATEGORY && { backgroundColor: `${GREEN}22` },
                ]}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    { color: subcategoryId === NO_SUBCATEGORY ? GREEN : theme.mutedForeground },
                  ]}
                >
                  Nenhuma
                </Text>
                {subcategoryId === NO_SUBCATEGORY && (
                  <MaterialIcons name="check" size={18} color={GREEN} />
                )}
              </Pressable>
              {subcategoryOptions.map((opt) => (
                <Pressable
                  key={opt.id}
                  onPress={() => {
                    setSubcategoryId(opt.id)
                    setShowSubcategoryPicker(false)
                  }}
                  style={[
                    styles.pickerItem,
                    opt.id === subcategoryId && { backgroundColor: `${GREEN}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === subcategoryId ? GREEN : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === subcategoryId && (
                    <MaterialIcons name="check" size={18} color={GREEN} />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.mutedForeground }]}>DATA DE INÍCIO</Text>
          <Pressable
            onPress={() => setShowStartPicker(true)}
            style={[
              styles.dropdownRow,
              { backgroundColor: theme.surface },
              errors.startDate ? styles.fieldError : null,
            ]}
          >
            <Text
              style={[
                styles.dropdownText,
                { color: startDate ? theme.foreground : theme.border, flex: 1 },
              ]}
            >
              {startDate ? formatDateDisplay(startDate) : 'dd / mm / aaaa'}
            </Text>
            <MaterialIcons name="calendar-month" size={18} color={theme.mutedForeground} />
          </Pressable>
          <Text style={[styles.errorText, { display: errors.startDate ? 'flex' : 'none' }]}>
            {errors.startDate ?? ''}
          </Text>
        </View>

        <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
          <View style={styles.toggleInfo}>
            <Text style={[styles.toggleTitle, { color: theme.foreground }]}>DURAÇÃO</Text>
            <Text
              style={[
                styles.toggleValue,
                { color: isIndeterminate ? GREEN : theme.mutedForeground },
              ]}
            >
              {isIndeterminate ? 'Indeterminada' : 'Com data de término'}
            </Text>
          </View>
          <Switch
            value={isIndeterminate}
            onValueChange={setIsIndeterminate}
            trackColor={{ false: theme.border, true: `${GREEN}55` }}
            thumbColor={isIndeterminate ? GREEN : theme.mutedForeground}
          />
        </View>

        {!isIndeterminate && (
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.mutedForeground }]}>DATA DE TÉRMINO</Text>
            <Pressable
              onPress={() => setShowEndPicker(true)}
              style={[
                styles.dropdownRow,
                { backgroundColor: theme.surface },
                errors.endDate ? styles.fieldError : null,
              ]}
            >
              <Text
                style={[
                  styles.dropdownText,
                  { color: endDate ? theme.foreground : theme.border, flex: 1 },
                ]}
              >
                {endDate ? formatDateDisplay(endDate) : 'dd / mm / aaaa'}
              </Text>
              <MaterialIcons name="calendar-month" size={18} color={theme.mutedForeground} />
            </Pressable>
            {errors.endDate ? <Text style={styles.errorText}>{errors.endDate}</Text> : null}
          </View>
        )}

        <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
          <View style={styles.toggleInfo}>
            <MaterialIcons name="bolt" size={20} color={isActive ? GREEN : theme.mutedForeground} />
            <View style={styles.toggleTextBlock}>
              <Text style={[styles.toggleTitle, { color: theme.foreground }]}>
                Recorrência Ativa
              </Text>
              <Text style={[styles.toggleSub, { color: GREEN }]}>
                Lançar automaticamente no calendário.
              </Text>
            </View>
          </View>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            trackColor={{ false: theme.border, true: `${GREEN}55` }}
            thumbColor={isActive ? GREEN : theme.mutedForeground}
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!isFormValid}
          style={({ pressed }) => [
            styles.saveBtn,
            {
              backgroundColor: isFormValid ? theme.primary : theme.primaryDisabled,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={[styles.saveBtnText, { color: theme.onPrimary }]}>
            {isEditing ? 'Atualizar Recorrência' : 'Salvar Recorrência'}
          </Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <NumericKeypad
        visible={keypadVisible}
        amountCents={amountCents}
        type={type as TransactionType}
        onKeyPress={handleKeypad}
        onSave={() => setKeypadVisible(false)}
        asOverlay
      />

      <DatePickerModal
        visible={showStartPicker}
        value={startDate}
        onConfirm={(date) => {
          setStartDate(date)
          setShowStartPicker(false)
        }}
        onCancel={() => setShowStartPicker(false)}
        asOverlay
      />

      <DatePickerModal
        visible={showEndPicker}
        value={endDate}
        onConfirm={(date) => {
          setEndDate(date)
          setShowEndPicker(false)
        }}
        onCancel={() => setShowEndPicker(false)}
        asOverlay
      />

      <SuccessToast
        visible={showSuccess}
        message={
          isEditing ? 'Recorrência atualizada com sucesso.' : 'Recorrência criada com sucesso.'
        }
      />

      <EditScopeModal
        visible={showEditScopeModal}
        onConfirm={handleScopeConfirm}
        onCancel={() => setShowEditScopeModal(false)}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    gap: 16,
  },
  titleBlock: {
    gap: 4,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
  typeTabs: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginHorizontal: 20,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeTabText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fieldInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  fieldError: {
    borderWidth: 1,
    borderColor: '#D14349',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  dropdownText: {
    fontSize: 15,
    color: '#fff',
  },
  pickerList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  pickerItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  toggleTextBlock: {
    flex: 1,
    gap: 3,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleValue: {
    fontSize: 13,
  },
  toggleSub: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 11,
    color: '#D14349',
    marginTop: 2,
  },
  bottomSpacer: {
    height: 32,
  },
  saveBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
})
