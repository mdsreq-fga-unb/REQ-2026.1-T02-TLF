import { Text, TextProps } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { typography } from '@/utils/typography'
import type { TypographyToken } from '@/utils/typography'
import { resolveTextTone, type TextTone } from '@/utils/textTone'
import { ReactNode } from 'react'

export type { TextTone }

export type TextTypographyVariant = TypographyToken

type props = TextProps & {
  text: string
  children?: ReactNode
  variant?: TextTypographyVariant
  tone?: TextTone
}

const variantTypography: Record<
  TextTypographyVariant,
  (typeof typography)[keyof typeof typography]
> = {
  headline: typography.headline,
  title: typography.title,
  display: typography.display,
  body: typography.body,
  bodyLarge: typography.bodyLarge,
  label: typography.label,
  caption: typography.caption,
  link: typography.link,
  button: typography.button,
}

function usesHeadlineLayout(v: TextTypographyVariant): boolean {
  return v === 'headline' || v === 'display'
}

export function ThemedText({
  text,
  children,
  style,
  variant = 'body',
  tone = 'default',
  ...rest
}: props) {
  const colors = useThemeColor()
  const color = resolveTextTone(colors, tone)
  const variantStyle = usesHeadlineLayout(variant) ? styles.headline : styles.text

  return (
    <Text style={[variantStyle, variantTypography[variant], { color }, style]} {...rest}>
      {text}
      {children}
    </Text>
  )
}
