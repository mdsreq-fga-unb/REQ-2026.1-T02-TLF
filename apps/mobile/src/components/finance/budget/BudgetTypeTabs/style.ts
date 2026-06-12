import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
  },
  labelActive: {
    fontWeight: '600',
  },
})
