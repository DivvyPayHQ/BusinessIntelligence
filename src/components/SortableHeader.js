import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SortableHeader = ({title, sortDirection, setSortColumn, setSortDirection}) => {
    const onPress = () => {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      setSortColumn(title);
    };
    return (
      <View style={{flexDirection: 'row', padding: 16, alignItems: 'flex-start', flex: 1}}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={onPress}><Icon style={{alignSelf: 'center', margin: 6}} name='sort'/></TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 16,
      fontWeight: '700',
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
    }
  });