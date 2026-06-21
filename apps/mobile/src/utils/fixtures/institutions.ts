import type { InstitutionListItem } from '@/components/finance/institutions/types'

export const mockInstitutions: InstitutionListItem[] = [
  {
    id: 'mock-inst-1',
    name: 'Nubank',
    color: '#820AD1',
    icon: 'landmark',
    iconColor: '#FFFFFF',
    accountsCount: 2,
  },
  {
    id: 'mock-inst-2',
    name: 'Itaú Unibanco',
    color: '#EC7000',
    icon: 'landmark',
    iconColor: '#FFFFFF',
    accountsCount: 0,
  },
  {
    id: 'mock-inst-3',
    name: 'XP Investimentos',
    color: '#000000',
    icon: 'landmark',
    iconColor: '#FFB700',
    accountsCount: 0,
  },
]
