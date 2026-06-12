import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  optionLeft: {
    width: 24,
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    gap: 3,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
})
