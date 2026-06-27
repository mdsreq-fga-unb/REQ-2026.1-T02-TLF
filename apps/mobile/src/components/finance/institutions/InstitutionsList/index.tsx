import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { InstitutionItem } from '@/components/finance/institutions/InstitutionItem'
import type { InstitutionListItem } from '@/components/finance/institutions/types'
import { styles } from './style'

type Props = {
  institutions: InstitutionListItem[]
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
  onEditInstitution?: (institution: InstitutionListItem) => void
  onDeleteInstitution?: (id: string) => void
}

export function InstitutionsList({
  institutions,
  isLoading = false,
  error,
  emptyMessage = 'Nenhuma instituicao cadastrada.',
  onEditInstitution,
  onDeleteInstitution,
}: Props) {
  if (isLoading) {
    return (
      <ThemedText text="Carregando..." variant="caption" tone="muted" style={styles.stateText} />
    )
  }

  if (error) {
    return <ThemedText text={error} variant="caption" tone="destructive" style={styles.stateText} />
  }

  if (institutions.length === 0) {
    return (
      <ThemedText text={emptyMessage} variant="caption" tone="muted" style={styles.stateText} />
    )
  }

  return (
    <View style={styles.list}>
      {institutions.map((institution) => (
        <InstitutionItem
          key={institution.id}
          institution={institution}
          onEdit={onEditInstitution}
          onDelete={onDeleteInstitution}
        />
      ))}
    </View>
  )
}
