import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
import { useNovaRecorrencia, frequencyOptions, formatDateDisplay } from '@/hooks/useNovaRecorrencia'
import { novaStyles as styles } from '@/styles/recorrencia.style'
import type { TransactionType } from '@/services/database/queries/transaction'
import type { ComponentProps } from 'react'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

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
          {
            color: theme.destructive,
            textAlign: 'center',
            marginTop: -8,
            display: errors.amount ? 'flex' : 'none',
          },
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
                    opt.value === frequency && { backgroundColor: `${theme.success}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.value === frequency ? theme.success : theme.foreground },
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {opt.value === frequency && (
                    <MaterialIcons name="check" size={18} color={theme.success} />
                  )}
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
                    style={[
                      styles.pickerItem,
                      d === dueDay && { backgroundColor: `${theme.success}22` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        { color: d === dueDay ? theme.success : theme.foreground },
                      ]}
                    >
                      Dia {d}
                    </Text>
                    {d === dueDay && <MaterialIcons name="check" size={18} color={theme.success} />}
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
                    opt.id === accountId && { backgroundColor: `${theme.success}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === accountId ? theme.success : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === accountId && (
                    <MaterialIcons name="check" size={18} color={theme.success} />
                  )}
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
                    opt.id === categoryId && { backgroundColor: `${theme.success}22` },
                  ]}
                >
                  <MaterialIcons
                    name={opt.icon as MaterialIconName}
                    size={18}
                    color={opt.id === categoryId ? theme.success : theme.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === categoryId ? theme.success : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === categoryId && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color={theme.success}
                      style={{ marginLeft: 'auto' }}
                    />
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
                  subcategoryId === NO_SUBCATEGORY && { backgroundColor: `${theme.success}22` },
                ]}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    {
                      color:
                        subcategoryId === NO_SUBCATEGORY ? theme.success : theme.mutedForeground,
                    },
                  ]}
                >
                  Nenhuma
                </Text>
                {subcategoryId === NO_SUBCATEGORY && (
                  <MaterialIcons name="check" size={18} color={theme.success} />
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
                    opt.id === subcategoryId && { backgroundColor: `${theme.success}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: opt.id === subcategoryId ? theme.success : theme.foreground },
                    ]}
                  >
                    {opt.name}
                  </Text>
                  {opt.id === subcategoryId && (
                    <MaterialIcons name="check" size={18} color={theme.success} />
                  )}
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
          <ThemedFieldError message={errors.startDate ?? ''} visible={!!errors.startDate} />
        </View>

        <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
          <View style={styles.toggleInfo}>
            <ThemedText style={styles.toggleTitle} text="DURAÇÃO" />
            <Text
              style={[
                styles.toggleValue,
                { color: isIndeterminate ? theme.success : theme.mutedForeground },
              ]}
            >
              {isIndeterminate ? 'Indeterminada' : 'Com data de término'}
            </Text>
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
            <ThemedFieldError message={errors.endDate ?? ''} visible={!!errors.endDate} />
          </View>
        )}

        <View style={[styles.toggleRow, { backgroundColor: theme.surface }]}>
          <View style={styles.toggleInfo}>
            <MaterialIcons
              name="bolt"
              size={20}
              color={isActive ? theme.success : theme.mutedForeground}
            />
            <View style={styles.toggleTextBlock}>
              <ThemedText style={styles.toggleTitle} text="Recorrência Ativa" />
              <Text style={[styles.toggleSub, { color: theme.success }]}>
                Lançar automaticamente no calendário.
              </Text>
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
          style={[styles.saveBtn, { width: '100%' }]}
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
  )
}
