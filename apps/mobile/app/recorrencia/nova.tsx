import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native'
import { router } from 'expo-router'
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Zap,
} from 'lucide-react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { EditScopeModal } from '@/components/finance/recurrences/EditScopeModal'
import { AmountDisplay } from '@/components/finance/transactions/AmountDisplay'
import { NumericKeypad } from '@/components/finance/transactions/NumericKeypad'
import { DatePickerModal } from '@/components/ui/DatePickerModal'
import { mockAccounts, mockCategories } from '@/components/finance/recurrences/recurrences-data'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import {
  useNovaRecorrencia,
  frequencyOptions,
  formatDateDisplay,
} from '@/hooks/recurrences/useNovaRecorrencia'
import { TransactionType } from '@/services/database/models/transaction'
export default function NovaRecorrenciaScreen() {
  const theme = useThemeColor()
  const {
    isEditing,
    type,
    setType,
    amountCents,
    keypadVisible,
    setKeypadVisible,
    description,
    setDescription,
    frequency,
    setFrequency,
    dueDay,
    setDueDay,
    accountId,
    setAccountId,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isIndeterminate,
    setIsIndeterminate,
    showStartPicker,
    setShowStartPicker,
    showEndPicker,
    setShowEndPicker,
    isActive,
    setIsActive,
    errors,
    showSuccess,
    showEditScopeModal,
    setShowEditScopeModal,
    showFrequencyPicker,
    setShowFrequencyPicker,
    showDayPicker,
    setShowDayPicker,
    showAccountPicker,
    setShowAccountPicker,
    showCategoryPicker,
    setShowCategoryPicker,
    showSubcategoryPicker,
    setShowSubcategoryPicker,
    isFormValid,
    selectedFrequencyLabel,
    selectedAccount,
    selectedCategory,
    subcategoryOptions,
    selectedSubcategory,
    handleKeypad,
    handleSave,
    handleScopeConfirm,
    validateField,
    NO_SUBCATEGORY,
  } = useNovaRecorrencia()

  return (
    <ThemedBackground>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <ArrowLeft size={22} color={theme.foreground} />
          </Pressable>
          <ThemedText text="Recorrência" style={styles.headerTitle} />
          <View style={styles.headerBtn} />
        </View>

        <View style={styles.titleBlock}>
          <ThemedText
            text={isEditing ? 'Editar Recorrência' : 'Nova Recorrência'}
            style={styles.title}
          />
          <ThemedText
            text="Configure um pagamento ou recebimento automático."
            tone="muted"
            style={styles.subtitle}
          />
        </View>

        <View style={[styles.typeTabs, { backgroundColor: theme.surface }]}>
          {(['EXPENSE', 'INCOME'] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setType(t)}
              style={[
                styles.typeTab,
                type === t && { backgroundColor: t === 'EXPENSE' ? theme.expense : theme.success },
              ]}
            >
              <ThemedText
                text={t === 'EXPENSE' ? 'DESPESA' : 'RECEITA'}
                variant="label"
                tone={type === t ? 'onPrimary' : 'muted'}
                style={[styles.typeTabText, type === t && { color: '#0F0F13' }]}
              />
            </Pressable>
          ))}
        </View>

        <AmountDisplay
          amountCents={amountCents}
          type={type as TransactionType}
          onPress={() => setKeypadVisible(true)}
        />
        <ThemedFieldError message={errors.amount ?? ''} visible={!!errors.amount} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fieldGroup}>
            <ThemedText tone="muted" style={styles.label} text="DESCRIÇÃO" />
            <TextInput
              value={description}
              onChangeText={setDescription}
              onBlur={() => validateField('description', description)}
              placeholder="Ex: Aluguel, Netflix, Salário..."
              placeholderTextColor={theme.border}
              style={[
                styles.fieldInput,
                { backgroundColor: theme.surface, color: theme.foreground },
                errors.description ? [styles.fieldError, { borderColor: theme.destructive }] : null,
              ]}
            />
            <ThemedFieldError message={errors.description ?? ''} visible={!!errors.description} />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText tone="muted" style={styles.label} text="FREQUÊNCIA" />
            <Pressable
              onPress={() => setShowFrequencyPicker((v) => !v)}
              style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
            >
              <ThemedText
                text={selectedFrequencyLabel}
                variant="body"
                style={styles.dropdownText}
              />
              {showFrequencyPicker ? (
                <ChevronUp size={22} color={theme.mutedForeground} />
              ) : (
                <ChevronDown size={22} color={theme.mutedForeground} />
              )}
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
                      opt.value === frequency && { backgroundColor: `${theme.success}22` },
                    ]}
                  >
                    <ThemedText
                      text={opt.label}
                      variant="body"
                      style={[
                        styles.pickerItemText,
                        { color: opt.value === frequency ? theme.success : theme.foreground },
                      ]}
                    />
                    {opt.value === frequency && <Check size={18} color={theme.success} />}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText
              tone="muted"
              style={styles.label}
              text={frequency === 'WEEKLY' ? 'DIA DA SEMANA' : 'DIA DO VENCIMENTO'}
            />
            <Pressable
              onPress={() => setShowDayPicker((v) => !v)}
              style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
            >
              <ThemedText
                text={dueDay ? `Dia ${dueDay}` : 'Selecione'}
                variant="body"
                style={[styles.dropdownText, { flex: 1 }]}
              />
              {showDayPicker ? (
                <ChevronUp size={22} color={theme.mutedForeground} />
              ) : (
                <ChevronDown size={22} color={theme.mutedForeground} />
              )}
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
                      style={[
                        styles.pickerItem,
                        d === dueDay && { backgroundColor: `${theme.success}22` },
                      ]}
                    >
                      <ThemedText
                        text={`Dia ${d}`}
                        variant="body"
                        style={[
                          styles.pickerItemText,
                          { color: d === dueDay ? theme.success : theme.foreground },
                        ]}
                      />
                      {d === dueDay && <Check size={18} color={theme.success} />}
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
            <ThemedFieldError message={errors.dueDay ?? ''} visible={!!errors.dueDay} />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText
              tone="muted"
              style={styles.label}
              text={type === 'INCOME' ? 'CONTA DE DESTINO' : 'CONTA DE ORIGEM'}
            />
            <Pressable
              onPress={() => setShowAccountPicker((v) => !v)}
              style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
            >
              <ThemedText text={selectedAccount.name} variant="body" style={styles.dropdownText} />
              <ChevronsUpDown size={20} color={theme.mutedForeground} />
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
                      opt.id === accountId && { backgroundColor: `${theme.success}22` },
                    ]}
                  >
                    <ThemedText
                      text={opt.name}
                      variant="body"
                      style={[
                        styles.pickerItemText,
                        { color: opt.id === accountId ? theme.success : theme.foreground },
                      ]}
                    />
                    {opt.id === accountId && <Check size={18} color={theme.success} />}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText tone="muted" style={styles.label} text="CATEGORIA" />
            <Pressable
              onPress={() => setShowCategoryPicker((v) => !v)}
              style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
            >
              <ThemedText text={selectedCategory.name} variant="body" style={styles.dropdownText} />
              <AppIcon name={selectedCategory.icon} size={20} color={theme.mutedForeground} />
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
                      opt.id === categoryId && { backgroundColor: `${theme.success}22` },
                    ]}
                  >
                    <AppIcon
                      name={opt.icon}
                      size={18}
                      color={opt.id === categoryId ? theme.success : theme.mutedForeground}
                    />
                    <ThemedText
                      text={opt.name}
                      variant="body"
                      style={[
                        styles.pickerItemText,
                        { color: opt.id === categoryId ? theme.success : theme.foreground },
                      ]}
                    />
                    {opt.id === categoryId && (
                      <View style={{ marginLeft: 'auto' }}>
                        <Check size={18} color={theme.success} />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText tone="muted" style={styles.label} text="SUBCATEGORIA (OPCIONAL)" />
            <Pressable
              onPress={() => setShowSubcategoryPicker((v) => !v)}
              style={[styles.dropdownRow, { backgroundColor: theme.surface }]}
            >
              <ThemedText
                text={selectedSubcategory?.name ?? 'Nenhuma'}
                variant="body"
                style={[styles.dropdownText, { flex: 1 }]}
              />
              {showSubcategoryPicker ? (
                <ChevronUp size={22} color={theme.mutedForeground} />
              ) : (
                <ChevronDown size={22} color={theme.mutedForeground} />
              )}
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
                    subcategoryId === NO_SUBCATEGORY && { backgroundColor: `${theme.success}22` },
                  ]}
                >
                  <ThemedText
                    text="Nenhuma"
                    variant="body"
                    tone={subcategoryId === NO_SUBCATEGORY ? 'default' : 'muted'}
                    style={[
                      styles.pickerItemText,
                      subcategoryId === NO_SUBCATEGORY && { color: theme.success },
                    ]}
                  />
                  {subcategoryId === NO_SUBCATEGORY && <Check size={18} color={theme.success} />}
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
                      opt.id === subcategoryId && { backgroundColor: `${theme.success}22` },
                    ]}
                  >
                    <ThemedText
                      text={opt.name}
                      variant="body"
                      style={[
                        styles.pickerItemText,
                        { color: opt.id === subcategoryId ? theme.success : theme.foreground },
                      ]}
                    />
                    {opt.id === subcategoryId && <Check size={18} color={theme.success} />}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText tone="muted" style={styles.label} text="DATA DE INÍCIO" />
            <Pressable
              onPress={() => setShowStartPicker(true)}
              style={[
                styles.dropdownRow,
                { backgroundColor: theme.surface },
                errors.startDate ? [styles.fieldError, { borderColor: theme.destructive }] : null,
              ]}
            >
              <ThemedText
                text={startDate ? formatDateDisplay(startDate) : 'dd / mm / aaaa'}
                variant="body"
                tone={startDate ? 'default' : 'muted'}
                style={[styles.dropdownText, { flex: 1 }]}
              />
              <Calendar size={18} color={theme.mutedForeground} />
            </Pressable>
            <ThemedFieldError message={errors.startDate ?? ''} visible={!!errors.startDate} />
          </View>

          <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
            <View style={styles.toggleInfo}>
              <ThemedText style={styles.toggleTitle} text="DURAÇÃO" />
              <ThemedText
                text={isIndeterminate ? 'Indeterminada' : 'Com data de término'}
                variant="body"
                tone={isIndeterminate ? 'default' : 'muted'}
                style={[styles.toggleValue, isIndeterminate && { color: theme.success }]}
              />
            </View>
            <Switch
              value={isIndeterminate}
              onValueChange={setIsIndeterminate}
              trackColor={{ false: theme.border, true: `${theme.success}55` }}
              thumbColor={isIndeterminate ? theme.success : theme.mutedForeground}
            />
          </View>

          {!isIndeterminate && (
            <View style={styles.fieldGroup}>
              <ThemedText tone="muted" style={styles.label} text="DATA DE TÉRMINO" />
              <Pressable
                onPress={() => setShowEndPicker(true)}
                style={[
                  styles.dropdownRow,
                  { backgroundColor: theme.surface },
                  errors.endDate ? [styles.fieldError, { borderColor: theme.destructive }] : null,
                ]}
              >
                <ThemedText
                  text={endDate ? formatDateDisplay(endDate) : 'dd / mm / aaaa'}
                  variant="body"
                  tone={endDate ? 'default' : 'muted'}
                  style={[styles.dropdownText, { flex: 1 }]}
                />
                <Calendar size={18} color={theme.mutedForeground} />
              </Pressable>
              <ThemedFieldError message={errors.endDate ?? ''} visible={!!errors.endDate} />
            </View>
          )}

          <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
            <View style={styles.toggleInfo}>
              <Zap size={20} color={isActive ? theme.success : theme.mutedForeground} />
              <View style={styles.toggleTextBlock}>
                <ThemedText style={styles.toggleTitle} text="Recorrência Ativa" />
                <ThemedText
                  text="Lançar automaticamente no calendário."
                  variant="caption"
                  style={[styles.toggleSub, { color: theme.success }]}
                />
              </View>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: theme.border, true: `${theme.success}55` }}
              thumbColor={isActive ? theme.success : theme.mutedForeground}
            />
          </View>

          <ThemedButton
            title={isEditing ? 'Atualizar Recorrência' : 'Salvar Recorrência'}
            disabled={!isFormValid}
            onPress={handleSave}
            style={{ width: '100%' }}
          />

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
    </ThemedBackground>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
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
  bottomSpacer: {
    height: 32,
  },
})
