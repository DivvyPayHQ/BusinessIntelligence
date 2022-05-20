import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
      alignItems: 'center',
    },
    row: {
      padding: 22,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemSeparator: {
      height: 1,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: 'lightgray',
    },
    headerText: {
      fontSize: 16,
      fontWeight: '700',
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
    }
  });