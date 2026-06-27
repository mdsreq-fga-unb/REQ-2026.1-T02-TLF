import { InstitutionForm } from '@/components/finance/institutions/InstitutionForm'
import { useEditarInstituicao } from '@/hooks/institutions/useEditarInstituicao'

export default function EditarInstituicaoScreen() {
  const {
    name,
    setName,
    color,
    icon,
    nameError,
    isFormValid,
    isSaving,
    showSuccess,
    previewName,
    validateName,
    openAppearance,
    handleSave,
    handleClose,
  } = useEditarInstituicao()

  return (
    <InstitutionForm
      title="Editar Instituição"
      submitLabel="Salvar Alterações"
      name={name}
      onNameChange={setName}
      onNameBlur={() => validateName(name)}
      color={color}
      icon={icon}
      previewName={previewName}
      nameError={nameError}
      submitDisabled={!isFormValid || isSaving}
      successVisible={showSuccess}
      successMessage="Instituição atualizada com sucesso."
      onOpenAppearance={openAppearance}
      onSubmit={handleSave}
      onClose={handleClose}
    />
  )
}
