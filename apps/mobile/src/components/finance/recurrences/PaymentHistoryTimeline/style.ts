import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  section: {
    gap: 12,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  timeline: {
    gap: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  timelineCol: {
    width: 32,
    alignItems: 'center',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLineTop: {
    width: 2,
    height: 16,
  },
  timelineLineBottom: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -8,
  },
  paymentCard: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  paymentCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  historyMonth: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 0,
  },
  historyMeta: {
    fontSize: 13,
    flex: 1,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexShrink: 0,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
})
