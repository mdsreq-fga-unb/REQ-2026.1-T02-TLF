import { getPaymentHistoryEntryDisplay } from '@/utils/recurrences/paymentHistory'
import { getNextBillingLabel } from '@/utils/recurrences/dates'
import { themes } from '@/utils/colors'

describe('recurrences dates', () => {
  it('builds next billing label from due day', () => {
    const label = getNextBillingLabel(5, new Date(2026, 4, 30))
    expect(label).toBe('5 Jun')
  })
})

describe('paymentHistory display', () => {
  const colors = themes.dark

  it('maps pending entry to display values', () => {
    const display = getPaymentHistoryEntryDisplay(
      { month: 5, year: 2026, status: 'PENDING' },
      10,
      120,
      colors,
    )

    expect(display.statusLabel).toBe('PENDENTE')
    expect(display.statusIcon).toBe('clock')
    expect(display.metaText).toBe('Vence dia 10')
    expect(display.isPending).toBe(true)
  })

  it('maps confirmed entry to display values', () => {
    const display = getPaymentHistoryEntryDisplay(
      { month: 4, year: 2026, status: 'CONFIRMED', date: '10/04', amount: 99 },
      10,
      120,
      colors,
    )

    expect(display.statusLabel).toBe('LIQUIDADO')
    expect(display.statusIcon).toBe('circle-check')
    expect(display.displayAmount).toBe(99)
  })
})
