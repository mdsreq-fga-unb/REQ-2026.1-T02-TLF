import { create } from 'zustand'
import { mockInstitutions } from '@/components/finance/institutions/institutions-data'
import type { InstitutionListItem } from '@/components/finance/institutions/types'

type InstitutionsState = {
  institutions: InstitutionListItem[]
  setInstitutions: (items: InstitutionListItem[]) => void
  addInstitution: (item: InstitutionListItem) => void
  updateInstitution: (id: string, changes: Partial<InstitutionListItem>) => void
  removeInstitution: (id: string) => void
}

export const useInstitutionsStore = create<InstitutionsState>((set) => ({
  institutions: mockInstitutions,
  setInstitutions: (items) => set({ institutions: items }),
  addInstitution: (item) => set((state) => ({ institutions: [...state.institutions, item] })),
  updateInstitution: (id, changes) =>
    set((state) => ({
      institutions: state.institutions.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    })),
  removeInstitution: (id) =>
    set((state) => ({
      institutions: state.institutions.filter((item) => item.id !== id),
    })),
}))
