import type { InstitutionListItem } from '@/components/finance/institutions/types'
import type { InstitutionApiItem } from '@/services/api/institutions'
import type { Institution } from '@/services/database/models/institution'

const DEFAULT_COLOR = '#6A66FF'
const DEFAULT_ICON = 'landmark'

export function mapLocalInstitutionToListItem(
  institution: Institution,
  accountsCount = 0,
): InstitutionListItem {
  return {
    id: institution.id,
    name: institution.name,
    color: institution.color || DEFAULT_COLOR,
    icon: institution.icon ?? DEFAULT_ICON,
    logoUrl: institution.logoUrl,
    accountsCount,
  }
}

export function mapApiInstitutionToListItem(institution: InstitutionApiItem): InstitutionListItem {
  return {
    id: institution.id,
    name: institution.name,
    color: institution.color || DEFAULT_COLOR,
    icon: institution.icon ?? DEFAULT_ICON,
    logoUrl: institution.logoUrl,
    accountsCount: 0,
  }
}
