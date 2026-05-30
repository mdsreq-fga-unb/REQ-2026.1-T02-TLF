import { Pressable, ScrollView, View } from 'react-native'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Background } from '@/components/ui/Background'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRecorrenciaDetails, MONTHS_FULL } from '@/hooks/useRecorrenciaDetails'
import { InfoRow } from '@/components/finance/recurrences/InfoRow'
import { DeleteRecurrenceModal } from '@/components/finance/recurrences/DeleteRecurrenceModal'
import { formatCurrency } from '@/utils/formatters'
import { detailsStyles as styles } from '@/styles/recorrencia.style'
import type { ComponentProps } from 'react'

type IconName = ComponentProps<typeof MaterialIcons>['name']

export default function RecorrenciaDetailsScreen() {
  const theme = useThemeColor()
  const {
    description,
    amount,
    dueDay,
    isActive,
    isExpense,
    accountName,
    frequencyLabel,
    typeLabel,
    icon,
    iconColor,
    history,
    annualProjection,
    nextBillingLabel,
    intFormatted,
    decPart,
    recurrenceForModal,
    showDeleteModal,
    setShowDeleteModal,
    handleEdit,
    handleDeleteConfirm,
  } = useRecorrenciaDetails()

  const amountColor = isExpense ? theme.expense : theme.income
  const statusColor = isActive ? theme.income : theme.mutedForeground

  return (
    <Background>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={8}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.foreground} />
        </Pressable>
        <ThemedText style={styles.headerTitle} text="Detalhes da Recorrência" />
        <View style={styles.headerBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainCard, { backgroundColor: theme.surface }]}>
          <View style={styles.cardTop}>
            <View style={[styles.iconCircle, { backgroundColor: `${iconColor}28` }]}>
              <MaterialIcons name={icon} size={28} color={iconColor} />
            </View>
            <View style={styles.cardTopText}>
              <ThemedText tone="muted" style={styles.typeLabel} text={typeLabel.toUpperCase()} />
              <ThemedText style={styles.descriptionText} text={description} />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.amountRow}>
            <View style={styles.amountBlock}>
              <ThemedText tone="muted" style={styles.amountCurrency} text="R$" />
              <ThemedText
                text={`${intFormatted},${decPart}`}
                variant="display"
                style={[styles.amountNumber, { color: amountColor }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              />
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}22` }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <ThemedText
                text={isActive ? 'ATIVO' : 'INATIVO'}
                variant="caption"
                style={[styles.statusText, { color: statusColor }]}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoBlock}>
            <InfoRow icon="account-balance" label={accountName} />
            <InfoRow
              icon="event"
              label={`Próxima cobrança: ${nextBillingLabel}`}
              color={theme.primary}
            />
            <InfoRow icon="sync" label={frequencyLabel} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.btnRow}>
            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <MaterialIcons name="edit" size={18} color={theme.onPrimary} />
              <ThemedText tone="onPrimary" style={styles.btnText} text="Editar" />
            </Pressable>
            <Pressable
              onPress={() => setShowDeleteModal(true)}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: theme.destructive, opacity: pressed ? 0.75 : 1 },
              ]}
            >
              <MaterialIcons name="delete" size={18} color="#fff" />
              <ThemedText tone="onPrimary" style={styles.btnText} text="Excluir" />
            </Pressable>
          </View>
        </View>

        <View style={[styles.section, { display: history.length > 0 ? 'flex' : 'none' }]}>
          <ThemedText style={styles.sectionTitle} text="Histórico de Pagamentos" />
          <View style={styles.timeline}>
            {history.map((entry, i) => {
              const isLast = i === history.length - 1
              const isPending = entry.status === 'PENDING'
              const isConfirmed = entry.status === 'CONFIRMED'

              const dotColor = isPending
                ? theme.pending
                : isConfirmed
                  ? theme.income
                  : theme.mutedForeground
              const statusIcon: IconName = isPending
                ? 'schedule'
                : isConfirmed
                  ? 'check-circle'
                  : 'skip-next'
              const statusLabel = isPending ? 'PENDENTE' : isConfirmed ? 'LIQUIDADO' : 'IGNORADO'
              const statusBg = isPending
                ? `${theme.pending}28`
                : isConfirmed
                  ? `${theme.income}28`
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
                      <ThemedText style={styles.historyMonth} text={monthLabel} />
                      <ThemedText
                        text={formatCurrency(displayAmount)}
                        variant="label"
                        tone={isPending ? 'muted' : 'default'}
                        style={styles.historyAmount}
                        numberOfLines={1}
                      />
                    </View>
                    <View style={[styles.paymentCardRow, { alignItems: 'center' }]}>
                      <ThemedText
                        tone="muted"
                        style={styles.historyMeta}
                        text={metaText}
                        numberOfLines={1}
                      />
                      <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
                        <ThemedText
                          text={statusLabel}
                          variant="caption"
                          style={[styles.statusPillText, { color: dotColor }]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        <View style={[styles.projectionCard, { backgroundColor: theme.surface }]}>
          <View style={[styles.projectionIconWrap, { backgroundColor: `${theme.primary}22` }]}>
            <MaterialIcons name="analytics" size={26} color={theme.primary} />
          </View>
          <View style={styles.projectionBody}>
            <ThemedText tone="muted" style={styles.projectionLabel} text="PROJEÇÃO ANUAL" />
            <ThemedText
              text={formatCurrency(annualProjection)}
              variant="title"
              style={[styles.projectionValue, { color: amountColor }]}
            />
            <ThemedText
              tone="muted"
              style={styles.projectionSub}
              text={isExpense ? 'Custo total estimado em 12 meses' : 'Receita estimada em 12 meses'}
            />
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
