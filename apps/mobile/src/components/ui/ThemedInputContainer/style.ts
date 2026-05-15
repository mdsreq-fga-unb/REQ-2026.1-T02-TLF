import { spacing } from '@/utils/dimensions'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 0,
    gap: spacing.xs,
    width: '100%',
  },
  fieldLabel: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
})
