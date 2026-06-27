import { create } from 'zustand'

type RecurrencesState = {
  pendingDeleteId: string | null
  setPendingDeleteId: (id: string | null) => void
  consumePendingDeleteId: () => string | null

  // Estado das confirmações do mês, persistido entre navegações (reset a cada mês).
  monthKey: string | null
  confirmedIds: string[]
  skippedIds: string[]
  resetForMonth: (monthKey: string) => void
  markConfirmed: (id: string) => void
  markSkipped: (id: string) => void
  unmark: (id: string) => void
}

const addUnique = (list: string[], id: string) => (list.includes(id) ? list : [...list, id])
const remove = (list: string[], id: string) => list.filter((item) => item !== id)

export const useRecurrencesStore = create<RecurrencesState>((set, get) => ({
  pendingDeleteId: null,
  setPendingDeleteId: (id) => set({ pendingDeleteId: id }),
  consumePendingDeleteId: () => {
    const id = get().pendingDeleteId
    set({ pendingDeleteId: null })
    return id
  },

  monthKey: null,
  confirmedIds: [],
  skippedIds: [],
  resetForMonth: (monthKey) => {
    if (get().monthKey === monthKey) return
    set({ monthKey, confirmedIds: [], skippedIds: [] })
  },
  markConfirmed: (id) =>
    set((state) => ({
      confirmedIds: addUnique(state.confirmedIds, id),
      skippedIds: remove(state.skippedIds, id),
    })),
  markSkipped: (id) =>
    set((state) => ({
      skippedIds: addUnique(state.skippedIds, id),
      confirmedIds: remove(state.confirmedIds, id),
    })),
  unmark: (id) =>
    set((state) => ({
      confirmedIds: remove(state.confirmedIds, id),
      skippedIds: remove(state.skippedIds, id),
    })),
}))
