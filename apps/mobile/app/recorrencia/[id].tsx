import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Background } from '@/components/ui/Background'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import {
  categoryColors,
  categoryIcons,
  getAccount,
  getCategory,
  mockPaymentHistory,
} from '@/components/finance/recurrences/recurrences-data'
import { DeleteRecurrenceModal } from '@/components/finance/recurrences/DeleteRecurrenceModal'
import { setPendingDeleteId } from '@/components/finance/recurrences/recurrences-store'
import type { ComponentProps } from 'react'
import type { Recurrence } from '@/components/finance/recurrences/types'

type IconName = ComponentProps<typeof MaterialIcons>['name']

const INCOME_COLOR = '#2CB67D'
const EXPENSE_COLOR = '#FF4B4B'
const DESTRUCTIVE = '#D14349'
const ORANGE = '#F59E0B'

const MONTHS_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]
const MONTHS_FULL = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

type InfoRowProps = {
  icon: IconName
  label: string
  color?: string
  theme: ReturnType<typeof useThemeColor>
}

function InfoRow({ icon, label, color, theme }: InfoRowProps) {
  return (
    <View style={infoRowStyles.row}>
      <MaterialIcons name={icon} size={16} color={color ?? theme.mutedForeground} />
      <Text style={[infoRowStyles.label, { color: color ?? theme.foreground }]}>{label}</Text>
    </View>
  )
}

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
})

export default function RecorrenciaDetailsScreen() {
  const theme = useThemeColor()
  const params = useLocalSearchParams<{
    id: string
    description: string
    amount: string
    type: string
    frequency: string
    dueDay: string
    accountId: string
    categoryId: string
    subcategoryId?: string
    startDate: string
    isActive: string
  }>()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const id = params.id ?? ''
  const description = params.description ?? ''
  const amount = parseFloat(params.amount ?? '0')
  const type = params.type ?? 'EXPENSE'
  const frequency = params.frequency ?? 'MONTHLY'
  const dueDay = parseInt(params.dueDay ?? '1')
  const accountId = params.accountId ?? ''
  const categoryId = params.categoryId ?? ''
  const subcategoryId = params.subcategoryId ?? ''
  const startDate = params.startDate ?? ''
  const isActive = params.isActive === '1'

  const isExpense = type === 'EXPENSE'
  const amountColor = isExpense ? EXPENSE_COLOR : INCOME_COLOR

  const accountName = getAccount(accountId)?.name ?? accountId
  const categoryName = getCategory(categoryId)?.name ?? categoryId
  const frequencyLabel =
    frequency === 'MONTHLY' ? 'Mensal' : frequency === 'WEEKLY' ? 'Semanal' : 'Anual'
  const typeLabel = `${categoryName} ${frequencyLabel}`

  const icon = (categoryIcons[categoryId] ?? 'category') as IconName
  const iconColor = categoryColors[categoryId] ?? '#4A5060'

  const history = mockPaymentHistory[id] ?? []
  const annualProjection = amount * 12

  const now = new Date()
  let nextMonth = now.getMonth()
  if (now.getDate() > dueDay) {
    nextMonth += 1
    if (nextMonth > 11) {
      nextMonth = 0
    }
  }
  const nextBillingLabel = `${dueDay} ${MONTHS_SHORT[nextMonth]}`

  const [intPart, decPart] = amount.toFixed(2).split('.')
  const intFormatted = parseInt(intPart).toLocaleString('pt-BR')

  const recurrenceForModal: Recurrence = {
    id,
    description,
    amount,
    type: type as Recurrence['type'],
    frequency: frequency as Recurrence['frequency'],
    dueDay,
    accountId,
    categoryId,
    subcategoryId: subcategoryId || undefined,
    startDate,
    duration: 'INDEFINITE',
    isActive,
  }

  const handleEdit = () => {
    router.push({
      pathname: '/recorrencia/nova',
      params: {
        id,
        description,
        amount: params.amount,
        type,
        frequency,
        dueDay: params.dueDay,
        accountId,
        categoryId,
        subcategoryId: subcategoryId ?? '',
        startDate,
        isActive: params.isActive,
      },
    })
  }

  const handleDeleteConfirm = () => {
    setPendingDeleteId(id)
    setShowDeleteModal(false)
    router.back()
  }

  return (
    <Background>
      {/* Header — alignSelf stretch corrige o achatamento do Background (alignItems: center) */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={8}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.foreground }]}>
          Detalhes da Recorrência
        </Text>
        {/* Spacer para centralizar o título */}
        <View style={styles.headerBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Card principal ── */}
        <View style={[styles.mainCard, { backgroundColor: theme.surface }]}>
          {/* Ícone + tipo + descrição */}
          <View style={styles.cardTop}>
            <View style={[styles.iconCircle, { backgroundColor: `${iconColor}28` }]}>
              <MaterialIcons name={icon} size={28} color={iconColor} />
            </View>
            <View style={styles.cardTopText}>
              <Text style={[styles.typeLabel, { color: theme.mutedForeground }]}>
                {typeLabel.toUpperCase()}
              </Text>
              <Text style={[styles.descriptionText, { color: theme.foreground }]}>
                {description}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Valor + badge de status */}
          <View style={styles.amountRow}>
            <View style={styles.amountBlock}>
              <Text style={[styles.amountCurrency, { color: theme.mutedForeground }]}>R$</Text>
              <Text
                style={[styles.amountNumber, { color: amountColor }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {intFormatted},{decPart}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isActive ? `${INCOME_COLOR}22` : theme.surfaceMuted },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isActive ? INCOME_COLOR : theme.mutedForeground },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: isActive ? INCOME_COLOR : theme.mutedForeground },
                ]}
              >
                {isActive ? 'ATIVO' : 'INATIVO'}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Informações: conta, próxima data, frequência */}
          <View style={styles.infoBlock}>
            <InfoRow icon="account-balance" label={accountName} theme={theme} />
            <InfoRow
              icon="event"
              label={`Próxima cobrança: ${nextBillingLabel}`}
              color={theme.primary}
              theme={theme}
            />
            <InfoRow icon="sync" label={frequencyLabel} theme={theme} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Botões de ação */}
          <View style={styles.btnRow}>
            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <MaterialIcons name="edit" size={18} color={theme.onPrimary} />
              <Text style={[styles.btnText, { color: theme.onPrimary }]}>Editar</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowDeleteModal(true)}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: DESTRUCTIVE, opacity: pressed ? 0.75 : 1 },
              ]}
            >
              <MaterialIcons name="delete" size={18} color="#fff" />
              <Text style={[styles.btnText, { color: '#fff' }]}>Excluir</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Histórico de Pagamentos ── */}
        <View style={[styles.section, { display: history.length > 0 ? 'flex' : 'none' }]}>
          <Text style={[styles.sectionTitle, { color: theme.foreground }]}>
            Histórico de Pagamentos
          </Text>
          <View style={styles.timeline}>
            {history.map((entry, i) => {
              const isLast = i === history.length - 1
              const isPending = entry.status === 'PENDING'
              const isConfirmed = entry.status === 'CONFIRMED'

              const dotColor = isPending
                ? ORANGE
                : isConfirmed
                  ? INCOME_COLOR
                  : theme.mutedForeground
              const statusIcon: IconName = isPending
                ? 'schedule'
                : isConfirmed
                  ? 'check-circle'
                  : 'skip-next'
              const statusLabel = isPending ? 'PENDENTE' : isConfirmed ? 'LIQUIDADO' : 'IGNORADO'
              const statusBg = isPending
                ? `${ORANGE}28`
                : isConfirmed
                  ? `${INCOME_COLOR}28`
                  : theme.surfaceMuted
              const monthLabel = MONTHS_FULL[entry.month - 1]
              const metaText = isPending
                ? `Vence dia ${dueDay}`
                : isConfirmed
                  ? `Confirmado em ${entry.date}`
                  : `Pulado em ${entry.date}`
              const displayAmount = isConfirmed ? (entry.amount ?? amount) : amount

              return (
                <View key={i} style={styles.timelineRow}>
                  <View style={styles.timelineCol}>
                    <View
                      style={[
                        styles.timelineLineTop,
                        { backgroundColor: theme.border, opacity: i > 0 ? 1 : 0 },
                      ]}
                    />
                    <View style={[styles.timelineDot, { backgroundColor: dotColor }]}>
                      <MaterialIcons name={statusIcon} size={14} color="#fff" />
                    </View>
                    <View
                      style={[
                        styles.timelineLineBottom,
                        { backgroundColor: theme.border, opacity: !isLast ? 1 : 0 },
                      ]}
                    />
                  </View>

                  <View style={[styles.paymentCard, { backgroundColor: theme.surface }]}>
                    <View style={styles.paymentCardRow}>
                      <Text style={[styles.historyMonth, { color: theme.foreground }]}>
                        {monthLabel}
                      </Text>
                      <Text
                        style={[
                          styles.historyAmount,
                          { color: isPending ? theme.mutedForeground : theme.foreground },
                        ]}
                        numberOfLines={1}
                      >
                        {formatCurrency(displayAmount)}
                      </Text>
                    </View>
                    <View style={[styles.paymentCardRow, { alignItems: 'center' }]}>
                      <Text
                        style={[styles.historyMeta, { color: theme.mutedForeground }]}
                        numberOfLines={1}
                      >
                        {metaText}
                      </Text>
                      <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
                        <Text style={[styles.statusPillText, { color: dotColor }]}>
                          {statusLabel}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        {/* ── Projeção Anual ── */}
        <View style={[styles.projectionCard, { backgroundColor: theme.surface }]}>
          <View style={[styles.projectionIconWrap, { backgroundColor: `${theme.primary}22` }]}>
            <MaterialIcons name="analytics" size={26} color={theme.primary} />
          </View>
          <View style={styles.projectionBody}>
            <Text style={[styles.projectionLabel, { color: theme.mutedForeground }]}>
              PROJEÇÃO ANUAL
            </Text>
            <Text style={[styles.projectionValue, { color: amountColor }]}>
              {formatCurrency(annualProjection)}
            </Text>
            <Text style={[styles.projectionSub, { color: theme.mutedForeground }]}>
              {isExpense ? 'Custo total estimado em 12 meses' : 'Receita estimada em 12 meses'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <DeleteRecurrenceModal
        visible={showDeleteModal}
        recurrence={recurrenceForModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  // ── Header ──
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },

  // ── Scroll ──
  scroll: {
    alignSelf: 'stretch',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
    gap: 16,
  },

  // ── Card principal ──
  mainCard: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTopText: {
    flex: 1,
    gap: 4,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    marginHorizontal: -20,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  amountBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  amountCurrency: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 4,
  },
  amountNumber: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
    lineHeight: 40,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexShrink: 0,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoBlock: {
    gap: 12,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Seção ──
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Timeline ──
  timeline: {
    gap: 8,
  },
  // alignItems padrão do RN em row é 'stretch' — timelineCol preenche a altura do paymentCard
  timelineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  timelineCol: {
    width: 32,
    alignItems: 'center',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Linha acima do dot (espaço fixo que alinha o dot com o conteúdo do card)
  timelineLineTop: {
    width: 2,
    height: 16,
  },
  // Linha abaixo do dot (preenche todo o espaço restante até o fim do card)
  timelineLineBottom: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -8,
  },
  paymentCard: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  paymentCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  historyMonth: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 0,
  },
  historyMeta: {
    fontSize: 13,
    flex: 1,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexShrink: 0,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // ── Projeção ──
  projectionCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  projectionIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  projectionBody: {
    flex: 1,
    gap: 3,
  },
  projectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  projectionValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  projectionSub: {
    fontSize: 12,
    fontWeight: '400',
  },
})
