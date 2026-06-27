import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    flex: 1,
    width: '100%',
    maxHeight: '70%',
    borderRadius: 24,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  grid: {
    paddingBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  iconCell: {
    width: '23%',
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCellSelected: {
    transform: [{ scale: 1.03 }],
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FF4FD8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#0B0B0F',
    fontWeight: '700',
  },
})
