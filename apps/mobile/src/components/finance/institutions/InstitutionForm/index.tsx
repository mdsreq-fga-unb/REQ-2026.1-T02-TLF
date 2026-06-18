import { Pressable, View } from 'react-native'
import { X } from 'lucide-react-native'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { SuccessToast } from '@/components/ui/SuccessToast'
import { InstitutionPreviewCard } from '@/components/finance/institutions/InstitutionPreviewCard'
import { AppearanceField } from '@/components/finance/institutions/AppearanceField'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { IconKey } from '@/utils/icons'
import { styles } from './style'

type Props = {
  title: string
  submitLabel: string
  name: string
  onNameChange: (value: string) => void
  onNameBlur?: () => void
  color: string
  icon: IconKey
  previewName: string
  nameError?: string
  submitDisabled?: boolean
  successVisible?: boolean
  successMessage?: string
  onOpenAppearance: () => void
  onSubmit: () => void
  onClose: () => void
}

export function InstitutionForm({
  title,
  submitLabel,
  name,
  onNameChange,
  onNameBlur,
  color,
  icon,
  previewName,
  nameError,
  submitDisabled,
  successVisible,
  successMessage = 'Instituição salva com sucesso.',
  onOpenAppearance,
  onSubmit,
  onClose,
}: Props) {
  const theme = useThemeColor()

  return (
    <ThemedBackground>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          hitSlop={8}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <X size={24} color={theme.foreground} />
        </Pressable>
        <ThemedText text={title} variant="title" style={styles.headerTitle} />
        <View style={styles.headerBtn} />
      </View>

      <ThemedScrollArea contentContainerStyle={styles.content}>
        <InstitutionPreviewCard name={previewName} color={color} icon={icon} />

        <ThemedInputContainer text="NOME DA INSTITUIÇÃO" style={styles.field}>
          <ThemedInputForm
            value={name}
            onChangeText={onNameChange}
            onBlur={onNameBlur}
            placeholder="Digite o nome..."
            autoCapitalize="words"
          />
          <ThemedFieldError message={nameError ?? ''} visible={!!nameError} />
        </ThemedInputContainer>

        <ThemedInputContainer text="APARÊNCIA" style={styles.field}>
          <AppearanceField color={color} icon={icon} onPress={onOpenAppearance} />
        </ThemedInputContainer>
      </ThemedScrollArea>

      <View style={[styles.footer, { backgroundColor: theme.background }]}>
        <ThemedButton
          title={submitLabel}
          onPress={onSubmit}
          disabled={submitDisabled}
          style={styles.saveButton}
        />
      </View>

      <SuccessToast visible={!!successVisible} message={successMessage} />
    </ThemedBackground>
  )
}
