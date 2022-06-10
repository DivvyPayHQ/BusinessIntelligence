import { StyleSheet } from 'react-native';

// used for both timerange and sortable header
export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    alignSelf: 'center',
    margin: 6,
  },
  activeTextStyles: {
    color: '#16a06d',
    fontWeight: '700',
  },
  inactiveTextStyles: {
    color: 'gray',
    fontWeight: '700',
  },
  activePillStyles: {
    borderBottomWidth: 2,
    borderColor: '#16a06d',
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    paddingRight: 5,
  },
  inactivePillStyles: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    paddingRight: 5,
  },
});
