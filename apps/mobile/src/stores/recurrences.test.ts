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
