import { StyleSheet } from 'react-native'

export const detailsStyles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  scroll: {
    alignSelf: 'stretch',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
    gap: 16,
  },
  mainCard: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTopText: {
    flex: 1,
    gap: 4,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    marginHorizontal: -20,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  amountBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  amountCurrency: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 4,
  },
  amountNumber: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
    lineHeight: 40,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexShrink: 0,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoBlock: {
    gap: 12,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    gap: 12,
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
  projectionCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  projectionIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  projectionBody: {
    flex: 1,
    gap: 3,
  },
  projectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  projectionValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  projectionSub: {
    fontSize: 12,
    fontWeight: '400',
  },
})

export const indexStyles = StyleSheet.create({
  scroll: {
    alignSelf: 'stretch',
    width: '100%',
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 48,
    paddingBottom: 100,
    gap: 14,
    alignItems: 'stretch',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
})

export const novaStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    gap: 16,
  },
  titleBlock: {
    gap: 4,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
  typeTabs: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginHorizontal: 20,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeTabText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fieldInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  fieldError: {
    borderWidth: 1,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  dropdownText: {
    fontSize: 15,
  },
  pickerList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  pickerItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  toggleTextBlock: {
    flex: 1,
    gap: 3,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleValue: {
    fontSize: 13,
  },
  toggleSub: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 11,
    marginTop: 2,
  },
  bottomSpacer: {
    height: 32,
  },
  saveBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
})
