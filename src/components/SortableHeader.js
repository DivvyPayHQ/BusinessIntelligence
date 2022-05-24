import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SortableHeader = ({title, isAscending, setSortColumn, setIsAscending}) => {
    const onPress = () => {
      setSortColumn(title); // used for sort method
      setIsAscending(!isAscending); // also used for sort method
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Icon style={styles.icon} name='sort'/>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
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
    }
  });