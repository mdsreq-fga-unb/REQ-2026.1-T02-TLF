import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const MONTHS_PT = [
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

type Props = {
  visible: boolean
  value: Date | null
  onConfirm: (date: Date) => void
  onCancel: () => void
  asOverlay?: boolean
}

export function DatePickerModal({ visible, value, onConfirm, onCancel, asOverlay = false }: Props) {
  const theme = useThemeColor()
  const today = new Date()

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = value ?? today
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [selected, setSelected] = useState<Date | null>(value)

  useEffect(() => {
    if (visible) {
      const base = value ?? today
      setViewMonth(new Date(base.getFullYear(), base.getMonth(), 1))
      setSelected(value)
    }
  }, [visible])

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length < 42) cells.push(null)

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1))

  const isSameDay = (day: number, date: Date | null) =>
    date != null &&
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day

  const isTodayCell = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  const calendarContent = (
    <Pressable style={[styles.card, { backgroundColor: theme.surface }]} onPress={() => {}}>
      <View style={styles.monthNav}>
        <Pressable
          onPress={prevMonth}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ChevronLeft size={26} color={theme.foreground} />
        </Pressable>
        <ThemedText
          text={`${MONTHS_PT[month]} ${year}`}
          variant="title"
          style={styles.monthLabel}
        />
        <Pressable
          onPress={nextMonth}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ChevronRight size={26} color={theme.foreground} />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((d, i) => (
          <ThemedText key={i} text={d} variant="caption" tone="muted" style={styles.weekDayLabel} />
        ))}
      </View>

      <View style={styles.grid}>
        {Array.from({ length: cells.length / 7 }, (_, row) => (
          <View key={row} style={styles.weekRow}>
            {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
              const sel = day != null && isSameDay(day, selected)
              const isToday = day != null && isTodayCell(day)
              return (
                <Pressable
                  key={col}
                  disabled={!day}
                  onPress={() => day && setSelected(new Date(year, month, day))}
                  style={[styles.dayCell, sel && styles.dayCellSelected]}
                >
                  {/* Always render Text and todayDot — use opacity/display to avoid Fabric addViewAt */}
                  <ThemedText
                    text={day != null ? String(day) : ''}
                    variant="body"
                    tone={sel ? 'onPrimary' : 'default'}
                    style={[
                      styles.dayText,
                      sel && { color: '#0F0F13' },
                      isToday && !sel && styles.dayTextToday,
                      isToday && !sel && { color: theme.success },
                      { opacity: day != null ? 1 : 0 },
                    ]}
                  />
                  <View
                    style={[
                      styles.todayDot,
                      { display: day != null && isToday && !sel ? 'flex' : 'none' },
                    ]}
                  />
                </Pressable>
              )
            })}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable onPress={onCancel} style={[styles.cancelBtn, { borderColor: theme.border }]}>
          <ThemedText text="Cancelar" variant="button" tone="muted" style={styles.cancelText} />
        </Pressable>
        <Pressable
          onPress={() => selected && onConfirm(selected)}
          disabled={!selected}
          style={[
            styles.confirmBtn,
            { backgroundColor: selected ? theme.success : theme.surfaceMuted },
          ]}
        >
          <ThemedText
            text="Confirmar"
            variant="button"
            tone={selected ? 'onPrimary' : 'muted'}
            style={[styles.confirmText, selected && { color: '#0F0F13' }]}
          />
        </Pressable>
      </View>
    </Pressable>
  )

  if (asOverlay) {
    return (
      <View
        style={[StyleSheet.absoluteFill, styles.backdrop, { display: visible ? 'flex' : 'none' }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        {calendarContent}
      </View>
    )
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        {calendarContent}
      </Pressable>
    </Modal>
  )
}
