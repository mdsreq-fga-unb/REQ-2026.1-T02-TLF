import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedLink } from '@/components/ui/ThemedLink'
import { ThemedOverlayAlert } from '@/components/ui/ThemedOverlayAlert'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useRegisterScreen } from '@/hooks/auth/useRegisterScreen'
import { layout, spacing } from '@/utils/dimensions'
import { Lock, Mail, User } from 'lucide-react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NamedLogo from '../../assets/imgs/tlt-icon.png'

export default function RegisterScreen() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    nameTouched,
    setNameTouched,
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    passwordConfirmTouched,
    setPasswordConfirmTouched,
    nameErrorMessage,
    emailErrorMessage,
    passwordErrorMessage,
    passwordConfirmErrorMessage,
    isFormValid,
    isSubmitting,
    submit,
    feedbackMessage,
    dismissFeedback,
  } = useRegisterScreen()

  const ctaDisabled = !isFormValid || isSubmitting

  return (
    <ThemedBackground>
      <ThemedScrollArea>
        <SafeAreaView />
        <ThemedContainer variant="transparent" style={{ gap: 0 }}>
          <Image
            source={NamedLogo}
            style={{ width: layout.authLogoSize, height: layout.authLogoSize }}
          />
          <ThemedContainer variant="transparent" style={{ marginBottom: spacing.lg }}>
            <ThemedContainer variant="transparent" style={{ gap: 0, padding: 0 }}>
              <ThemedText variant="headline" text="Criar uma conta," />
              <ThemedText
                variant="body"
                tone="muted"
                text="Junte-se ao nosso ecossistema financeiro para começar a sua jornada"
              />
            </ThemedContainer>

            <ThemedInputContainer text="Nome Completo">
              <ThemedInputForm
                icon={User}
                placeholder="Rodrigo Átila Tavares"
                onChangeText={setName}
                autoCapitalize="words"
                value={name}
                onBlur={() => {
                  setNameTouched(true)
                }}
              />
              <ThemedFieldError message={nameErrorMessage} visible={nameTouched} />
            </ThemedInputContainer>

            <ThemedInputContainer text="E-mail">
              <ThemedInputForm
                icon={Mail}
                placeholder="exemplo@email.com"
                onChangeText={setEmail}
                keyboardType="email-address"
                value={email}
                onBlur={() => {
                  setEmailTouched(true)
                }}
              />
              <ThemedFieldError message={emailErrorMessage} visible={emailTouched} />
            </ThemedInputContainer>

            <ThemedInputContainer text="Senha">
              <ThemedInputForm
                icon={Lock}
                placeholder="******"
                onChangeText={setPassword}
                secureTextEntry
                value={password}
                onBlur={() => {
                  setPasswordTouched(true)
                }}
              />
              <ThemedFieldError message={passwordErrorMessage} visible={passwordTouched} />
            </ThemedInputContainer>

            <ThemedInputContainer text="Confirme a senha">
              <ThemedInputForm
                icon={Lock}
                placeholder="******"
                onChangeText={setPasswordConfirm}
                secureTextEntry
                value={passwordConfirm}
                onBlur={() => {
                  setPasswordConfirmTouched(true)
                }}
              />
              <ThemedFieldError
                message={passwordConfirmErrorMessage}
                visible={passwordConfirmTouched}
              />
            </ThemedInputContainer>

            <ThemedButton title="Cadastrar" onPress={submit} disabled={ctaDisabled} />
            <ThemedSeparator />
            <ThemedContainer
              variant="transparent"
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: spacing.xs,
                padding: 0,
              }}
            >
              <ThemedText
                variant="body"
                text="Já possui uma conta? "
                style={{ textAlign: 'center' }}
              />
              <ThemedLink replace href="/(auth)/login" text="Entre aqui" />
            </ThemedContainer>
          </ThemedContainer>
        </ThemedContainer>
      </ThemedScrollArea>
      <ThemedOverlayAlert
        visible={feedbackMessage != null}
        onRequestClose={dismissFeedback}
        message={feedbackMessage ?? ''}
        actions={[{ label: 'Entendi', onPress: dismissFeedback }]}
      >
        <ThemedText
          variant="headline"
          text="Erro ao cadastrar"
          style={{ textAlign: 'center', width: '100%' }}
        />
      </ThemedOverlayAlert>
    </ThemedBackground>
  )
}
//TODO: resolve the problem related with keyboard and the scroll area
