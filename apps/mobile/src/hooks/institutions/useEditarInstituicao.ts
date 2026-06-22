import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { defaultAppearanceColor } from '@/utils/institutions/appearance'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionForm } from '@/hooks/institutions/useInstitutionForm'
import { useInstitutionsStore } from '@/stores/institutions'
import { mapLocalInstitutionToListItem } from '@/utils/institutions/institutionMappers'
import { syncDatabase } from '@/services/database/sync'
import type { IconKey } from '@/utils/icons'

const DEFAULT_ICON: IconKey = 'landmark'

export function useEditarInstituicao() {
  const params = useLocalSearchParams<{
    id: string
    name?: string
    color?: string
    icon?: string
  }>()

  const id = params.id ?? ''

  const form = useInstitutionForm({
    initialName: params.name ?? '',
    initialColor: params.color ?? defaultAppearanceColor,
    initialIcon: (params.icon as IconKey) ?? DEFAULT_ICON,
    returnTo: `/instituicao/${id}`,
  })

  const updateInstitutionInStore = useInstitutionsStore((state) => state.updateInstitution)
  const currentInstitution = useInstitutionsStore((state) =>
    state.institutions.find((institution) => institution.id === id),
  )

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (!form.validateName(form.name) || isSaving) return

    const payload = form.buildPayload()

    try {
      setIsSaving(true)
      const updatedInstitution = await institutionQueries.update(id, payload)
      updateInstitutionInStore(
        id,
        mapLocalInstitutionToListItem(updatedInstitution, currentInstitution?.accountsCount ?? 0),
      )

      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Falha ao sincronizar a instituição atualizada.', syncError)
      }

      setShowSuccess(true)
      setTimeout(() => router.navigate('/institutions'), 900)
    } catch (saveError) {
      console.error('Erro ao atualizar instituicao:', saveError)
      form.setNameError('Não foi possível salvar. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => router.navigate('/institutions')

  return {
    ...form,
    isSaving,
    showSuccess,
    handleSave,
    handleClose,
  }
}
