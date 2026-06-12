import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  actionContainer: {
    position: 'relative',
  },
  iconButton: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: -25,
    right: 40,
    borderRadius: 5,
    padding: 4,
    minWidth: 120,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
})
