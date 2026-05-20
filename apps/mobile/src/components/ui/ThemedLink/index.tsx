import { Link, LinkProps } from 'expo-router'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { typography } from '@/utils/typography'

type props = LinkProps & {
  text: string
}

export function ThemedLink({ text, style, ...rest }: props) {
  const colors = useThemeColor()

  return (
    <Link style={[styles.link, typography.link, { color: colors.link }, style]} {...rest}>
      {text}
    </Link>
  )
}
