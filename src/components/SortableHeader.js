import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/componentStyles';

export default function SortableHeader({
  title, isAscending, setSortColumn, setIsAscending,
}) {
  const onPress = () => {
    setSortColumn(title); // used for sort method
    setIsAscending(!isAscending); // also used for sort method
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <Icon style={styles.icon} name="sort" />
    </TouchableOpacity>
  );
}
