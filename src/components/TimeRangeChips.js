import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

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
        const inactiveChips = chips.map(chip => ({...chip, active: false}));
        inactiveChips[idx].active = true;
        setChips(inactiveChips);
        setTimeRange(idx);
    };
    return (
        <View style={{flexDirection: 'row', paddingLeft: 10}}>
            {chips.map((chip, index) => renderChip(index, chip))}
        </View>);
};

const styles = StyleSheet.create({
    activeTextStyles: {
        color: 'seagreen',
        fontWeight: '700',
    },
    inactiveTextStyles: {
        color: 'gray',
        fontWeight: '700',
    },
    activePillStyles: {
        borderBottomWidth:2,
        borderColor: 'seagreen',
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