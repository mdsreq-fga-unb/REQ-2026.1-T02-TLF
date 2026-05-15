import { component, layout, spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    width: '70%',
    minHeight: layout.minTouchTarget,
    paddingVertical: component.buttonPaddingVertical,
    borderRadius: component.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  label: {
    textAlign: 'center',
  },
})
