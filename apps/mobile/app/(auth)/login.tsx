import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedFieldError } from '@/components/ui/ThemedFieldError'
import { ThemedInputForm } from '@/components/ui/ThemedInputForm'
import { ThemedInputContainer } from '@/components/ui/ThemedInputContainer'
import { ThemedLink } from '@/components/ui/ThemedLink'
import { ThemedScrollArea } from '@/components/ui/ThemedScrollArea'
import { ThemedSeparator } from '@/components/ui/ThemedSeparator'
import { ThemedText } from '@/components/ui/ThemedText'
import { useLoginScreen } from '@/hooks/auth/useLoginScreen'
import { layout, spacing } from '@/utils/dimensions'
import { Lock, Mail } from 'lucide-react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NamedLogo from '../../assets/imgs/tlt-icon.png'

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    emailErrorMessage,
    passwordErrorMessage,
    isFormValid,
    isSubmitting,
    submit,
  } = useLoginScreen()

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
              <ThemedText variant="headline" text="Bem vindo de volta," />
              <ThemedText variant="body" tone="muted" text="Entre para gerenciar seu portifolio" />
            </ThemedContainer>
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
                autoCapitalize="none"
                value={password}
                onBlur={() => {
                  setPasswordTouched(true)
                }}
              />
              <ThemedFieldError message={passwordErrorMessage} visible={passwordTouched} />
            </ThemedInputContainer>
            <ThemedButton title="Entrar" onPress={submit} disabled={ctaDisabled} />
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
                text="Não possui uma conta? "
                style={{ textAlign: 'center' }}
              />
              <ThemedLink replace href="/(auth)/register" text="Crie uma conta aqui" />
            </ThemedContainer>
          </ThemedContainer>
        </ThemedContainer>
      </ThemedScrollArea>
    </ThemedBackground>
  )
}
