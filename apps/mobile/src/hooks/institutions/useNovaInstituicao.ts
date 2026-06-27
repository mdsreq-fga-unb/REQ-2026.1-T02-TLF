import { useState } from 'react'
import { router } from 'expo-router'
import { defaultAppearanceColor } from '@/utils/institutions/appearance'
import { institutionQueries } from '@/services/database/queries/institution'
import { useInstitutionForm } from '@/hooks/institutions/useInstitutionForm'
import { useInstitutionsStore } from '@/stores/institutions'
import { mapLocalInstitutionToListItem } from '@/utils/institutions/institutionMappers'
import { syncDatabase } from '@/services/database/sync'
import type { IconKey } from '@/utils/icons'

const DEFAULT_ICON: IconKey = 'landmark'

export function useNovaInstituicao() {
  const form = useInstitutionForm({
    initialName: '',
    initialColor: defaultAppearanceColor,
    initialIcon: DEFAULT_ICON,
    returnTo: '/instituicao/nova',
  })

  const addInstitution = useInstitutionsStore((state) => state.addInstitution)

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (!form.validateName(form.name) || isSaving) return

    const payload = form.buildPayload()

    try {
      setIsSaving(true)
      const createdInstitution = await institutionQueries.create(payload)
      addInstitution(mapLocalInstitutionToListItem(createdInstitution))

      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Falha ao sincronizar a nova instituição.', syncError)
      }

      setShowSuccess(true)
      setTimeout(() => router.navigate('/institutions'), 900)
    } catch (saveError) {
      console.error('Erro ao criar instituicao:', saveError)
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
