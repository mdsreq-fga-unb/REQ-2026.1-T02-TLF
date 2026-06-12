import { create } from 'zustand'

type RecurrencesState = {
  pendingDeleteId: string | null
  setPendingDeleteId: (id: string | null) => void
  consumePendingDeleteId: () => string | null
}

export const useRecurrencesStore = create<RecurrencesState>((set, get) => ({
  pendingDeleteId: null,
  setPendingDeleteId: (id) => set({ pendingDeleteId: id }),
  consumePendingDeleteId: () => {
    const id = get().pendingDeleteId
    set({ pendingDeleteId: null })
    return id
  },
}))
