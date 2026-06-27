import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  ring: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  swatchSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
})
