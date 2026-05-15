import { Link, LinkProps } from 'expo-router'
import React from 'react'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = LinkProps & {
  text: string
}

export function ThemedLink({ text, ...rest }: props) {
  return (
    <Link style={[styles.link, { color: useThemeColor().blueSecondary }]} {...rest}>
      {text}
    </Link>
  )
}
