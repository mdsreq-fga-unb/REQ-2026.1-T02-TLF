import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  list: {
    gap: 8,
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  group: {
    gap: 8,
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
})
