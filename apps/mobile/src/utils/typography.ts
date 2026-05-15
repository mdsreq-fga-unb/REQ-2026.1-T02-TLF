import type { TextStyle } from 'react-native'
import { fonts } from '@/utils/fonts'

const m = fonts.Manrope

export const typography = {
  headline: {
    fontFamily: m.bold,
    fontSize: 28,
    lineHeight: 36,
  } satisfies TextStyle,
  title: {
    fontFamily: m.bold,
    fontSize: 22,
    lineHeight: 28,
  } satisfies TextStyle,
  display: {
    fontFamily: m.bold,
    fontSize: 28,
    lineHeight: 36,
  } satisfies TextStyle,
  body: {
    fontFamily: m.regular,
    fontSize: 16,
    lineHeight: 22,
  } satisfies TextStyle,
  bodyLarge: {
    fontFamily: m.regular,
    fontSize: 17,
    lineHeight: 24,
  } satisfies TextStyle,
  label: {
    fontFamily: m.medium,
    fontSize: 14,
    lineHeight: 18,
  } satisfies TextStyle,
  caption: {
    fontFamily: m.regular,
    fontSize: 13,
    lineHeight: 18,
  } satisfies TextStyle,
  link: {
    fontFamily: m.medium,
    fontSize: 16,
    lineHeight: 22,
  } satisfies TextStyle,
  button: {
    fontFamily: m.bold,
    fontSize: 16,
    lineHeight: 22,
  } satisfies TextStyle,
} as const

export type TypographyToken = keyof typeof typography
