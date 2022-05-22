import { StyleSheet } from 'react-native';

// used for both business screen and drilldown
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignContent: 'center',
    },
    graphContainer: {
      height: 250,
      width: '100%',
    },
    businessHeader: {
      flex: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      borderTopColor: 'lightgray',
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    row: {
      padding: 22,
      backgroundColor: 'white',
      flexDirection: 'row',
      flex: 1,
    },
    alt: {
      backgroundColor: 'white',
    },
    notAlt: {
      backgroundColor: '#f8f8f8',
    },
    itemSeparator: {
      height: 1,
      width: '100%',
      alignSelf: 'center',
      backgroundColor: 'lightgray',
    },
    headerText: {
      fontSize: 16,
      fontWeight: '700',
    },
    revenueText: {
      paddingLeft: 20,
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: 'black',
    },
    companyText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
    headerDivider: {
        height: '100%',
        width: 1,
        backgroundColor: 'gray'
    },
  });