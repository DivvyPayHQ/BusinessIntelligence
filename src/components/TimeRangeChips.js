import React, { useState } from 'react';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import styles from './styles/componentStyles';

// Conditionally render style classes based on active chip
export function Chip({ options: { title, active }, onPress }) {
  return (
    <TouchableOpacity
      onPress={(idx) => onPress(idx)}
      style={active ? styles.activePillStyles : styles.inactivePillStyles}
    >
      <Text style={active ? styles.activeTextStyles : styles.inactiveTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function TimeRangeChips({ setTimeRange, defaultChips }) {
  const [chips, setChips] = useState(defaultChips);
  const onPress = (idx) => {
    const inactiveChips = chips.map((chip) => ({ ...chip, active: false }));
    inactiveChips[idx].active = true; // Set the one selected to active
    setChips(inactiveChips); // update state
    setTimeRange(idx); // set the timerange to index of chip (0,1 or 2)
  };
  const renderChip = (index, chip) => (
    <Chip
      key={index}
      onPress={() => onPress(index, chip)}
      options={chip}
    />
  );
  return (
    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
      {chips.map((chip, index) => renderChip(index, chip))}
    </View>
  );
}
