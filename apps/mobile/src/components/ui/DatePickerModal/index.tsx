import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, View, ScrollView } from 'react-native'
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react-native'
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

  const [mode, setMode] = useState<'date' | 'time'>('date')
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = value ?? today
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState<Date>(() => value ?? today)
  const [hours, setHours] = useState(selectedDate.getHours())
  const [minutes, setMinutes] = useState(selectedDate.getMinutes())

  useEffect(() => {
    if (visible) {
      const base = value ?? today
      setViewMonth(new Date(base.getFullYear(), base.getMonth(), 1))
      setSelectedDate(base)
      setHours(base.getHours())
      setMinutes(base.getMinutes())
      setMode('date')
    }
  }, [visible, value])

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

  const handleConfirm = () => {
    const finalDate = new Date(selectedDate)
    finalDate.setHours(hours)
    finalDate.setMinutes(minutes)
    onConfirm(finalDate)
  }

  const renderTimePicker = () => (
    <View style={styles.timeContainer}>
      <View style={styles.timeRow}>
        <View style={styles.timeColumn}>
          <ThemedText text="Hora" variant="caption" tone="muted" style={{ textAlign: 'center' }} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.timeList}>
            {Array.from({ length: 24 }, (_, i) => (
              <Pressable
                key={i}
                onPress={() => setHours(i)}
                style={[styles.timeItem, hours === i && { backgroundColor: theme.primary }]}
              >
                <ThemedText
                  text={String(i).padStart(2, '0')}
                  variant="title"
                  tone={hours === i ? 'onPrimary' : 'default'}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <ThemedText text=":" variant="title" style={{ marginTop: 40 }} />
        <View style={styles.timeColumn}>
          <ThemedText text="Min" variant="caption" tone="muted" style={{ textAlign: 'center' }} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.timeList}>
            {Array.from({ length: 60 }, (_, i) => (
              <Pressable
                key={i}
                onPress={() => setMinutes(i)}
                style={[styles.timeItem, minutes === i && { backgroundColor: theme.primary }]}
              >
                <ThemedText
                  text={String(i).padStart(2, '0')}
                  variant="title"
                  tone={minutes === i ? 'onPrimary' : 'default'}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )

  const calendarContent = (
    <Pressable style={[styles.card, { backgroundColor: theme.surface }]} onPress={() => {}}>
      <View style={styles.headerTabs}>
        <Pressable
          onPress={() => setMode('date')}
          style={[styles.tab, mode === 'date' && { borderBottomColor: theme.primary }]}
        >
          <CalendarIcon size={20} color={mode === 'date' ? theme.primary : theme.mutedForeground} />
          <ThemedText text="Data" variant="label" tone={mode === 'date' ? 'default' : 'muted'} />
        </Pressable>
        <Pressable
          onPress={() => setMode('time')}
          style={[styles.tab, mode === 'time' && { borderBottomColor: theme.primary }]}
        >
          <Clock size={20} color={mode === 'time' ? theme.primary : theme.mutedForeground} />
          <ThemedText text="Hora" variant="label" tone={mode === 'time' ? 'default' : 'muted'} />
        </Pressable>
      </View>

      {mode === 'date' ? (
        <>
          <View style={styles.monthNav}>
            <Pressable onPress={prevMonth} hitSlop={8}>
              <ChevronLeft size={26} color={theme.foreground} />
            </Pressable>
            <ThemedText text={`${MONTHS_PT[month]} ${year}`} variant="title" />
            <Pressable onPress={nextMonth} hitSlop={8}>
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
                  const isSelected = day != null && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
                  return (
                    <Pressable
                      key={col}
                      disabled={!day}
                      onPress={() => day && setSelectedDate(new Date(year, month, day))}
                      style={[styles.dayCell, isSelected && { backgroundColor: theme.primary, borderRadius: 10 }]}
                    >
                      <ThemedText
                        text={day != null ? String(day) : ''}
                        tone={isSelected ? 'onPrimary' : 'default'}
                        style={{ opacity: day != null ? 1 : 0 }}
                      />
                    </Pressable>
                  )
                })}
              </View>
            ))}
          </View>
        </>
      ) : renderTimePicker()}

      <View style={styles.footer}>
        <Pressable onPress={onCancel} style={styles.cancelBtn}>
          <ThemedText text="Cancelar" variant="button" tone="muted" />
        </Pressable>
        <Pressable onPress={handleConfirm} style={[styles.confirmBtn, { backgroundColor: theme.primary }]}>
          <ThemedText text="Confirmar" variant="button" tone="onPrimary" />
        </Pressable>
      </View>
    </Pressable>
  )

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={customStyles.backdrop} onPress={onCancel}>
        {calendarContent}
      </Pressable>
    </Modal>
  )
}

const customStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
})
