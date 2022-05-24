import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

// Conditionally render style classes based on active chip
export const Chip = ({options : {title, active}, onPress}) => {
    return (
        <TouchableOpacity onPress={(idx) => onPress(idx)} style={active ? styles.activePillStyles : styles.inactivePillStyles}>
            <Text style={active ? styles.activeTextStyles : styles.inactiveTextStyles}>{title}</Text>
        </TouchableOpacity>
    )
}

export const TimeRangeChips = ({setTimeRange, defaultChips}) => {
    const [chips, setChips] = useState(defaultChips);
    const renderChip = (index, chip) => <Chip key={index} onPress={() => onPress(index, chip)} options={chip}/>
    const onPress = (idx) => {
        const inactiveChips = chips.map(chip => ({...chip, active: false})); // Reset all chips to active: false
        inactiveChips[idx].active = true; // Set the one selected to active
        setChips(inactiveChips); // update state
        setTimeRange(idx); // set the timerange to index of chip (0,1 or 2)
    };
    return (
        <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
            {chips.map((chip, index) => renderChip(index, chip))}
        </View>);
};

const styles = StyleSheet.create({
    activeTextStyles: {
        color: '#16a06d',
        fontWeight: '700',
    },
    inactiveTextStyles: {
        color: 'gray',
        fontWeight: '700',
    },
    activePillStyles: {
        borderBottomWidth:2,
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