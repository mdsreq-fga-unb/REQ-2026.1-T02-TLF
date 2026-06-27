import { useRecurrencesStore } from '@/stores/recurrences'

describe('useRecurrencesStore', () => {
  beforeEach(() => {
    useRecurrencesStore.setState({ pendingDeleteId: null })
  })

  it('stores and consumes pending delete id once', () => {
    useRecurrencesStore.getState().setPendingDeleteId('rec-1')
    expect(useRecurrencesStore.getState().pendingDeleteId).toBe('rec-1')

    const consumed = useRecurrencesStore.getState().consumePendingDeleteId()
    expect(consumed).toBe('rec-1')
    expect(useRecurrencesStore.getState().pendingDeleteId).toBeNull()
  })

  it('returns null when nothing is pending', () => {
    expect(useRecurrencesStore.getState().consumePendingDeleteId()).toBeNull()
  })
})

describe('useRecurrencesStore (confirmações do mês)', () => {
  beforeEach(() => {
    useRecurrencesStore.setState({ monthKey: null, confirmedIds: [], skippedIds: [] })
  })

  it('marca confirmado e pulado de forma mutuamente exclusiva', () => {
    const store = useRecurrencesStore.getState()

    store.markConfirmed('a')
    store.markSkipped('b')
    expect(useRecurrencesStore.getState().confirmedIds).toEqual(['a'])
    expect(useRecurrencesStore.getState().skippedIds).toEqual(['b'])

    // confirmar um item pulado move ele de lista
    store.markConfirmed('b')
    expect(useRecurrencesStore.getState().skippedIds).toEqual([])
    expect(useRecurrencesStore.getState().confirmedIds).toEqual(['a', 'b'])

    store.unmark('a')
    expect(useRecurrencesStore.getState().confirmedIds).toEqual(['b'])
  })

  it('preserva o estado no mesmo mês e zera ao mudar de mês', () => {
    const store = useRecurrencesStore.getState()

    store.resetForMonth('2026-5')
    store.markConfirmed('a')
    expect(useRecurrencesStore.getState().confirmedIds).toEqual(['a'])

    // mesmo mês: não reseta
    useRecurrencesStore.getState().resetForMonth('2026-5')
    expect(useRecurrencesStore.getState().confirmedIds).toEqual(['a'])

    // mês diferente: reseta
    useRecurrencesStore.getState().resetForMonth('2026-6')
    expect(useRecurrencesStore.getState().confirmedIds).toEqual([])
  })
})
