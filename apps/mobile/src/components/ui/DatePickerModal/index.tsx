import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

const GREEN = '#00E383'

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
          <MaterialIcons name="chevron-left" size={26} color={theme.foreground} />
        </Pressable>
        <Text style={[styles.monthLabel, { color: theme.foreground }]}>
          {MONTHS_PT[month]} {year}
        </Text>
        <Pressable
          onPress={nextMonth}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <MaterialIcons name="chevron-right" size={26} color={theme.foreground} />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((d, i) => (
          <Text key={i} style={[styles.weekDayLabel, { color: theme.mutedForeground }]}>
            {d}
          </Text>
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
                  <Text
                    style={[
                      styles.dayText,
                      { color: sel ? '#0F0F13' : isToday ? GREEN : theme.foreground },
                      isToday && !sel && styles.dayTextToday,
                      { opacity: day != null ? 1 : 0 },
                    ]}
                  >
                    {day ?? ''}
                  </Text>
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
          <Text style={[styles.cancelText, { color: theme.mutedForeground }]}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={() => selected && onConfirm(selected)}
          disabled={!selected}
          style={[styles.confirmBtn, { backgroundColor: selected ? GREEN : theme.surfaceMuted }]}
        >
          <Text
            style={[styles.confirmText, { color: selected ? '#0F0F13' : theme.mutedForeground }]}
          >
            Confirmar
          </Text>
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
