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
        <View style={{flexDirection: 'row'}}>
            {chips.map((chip, index) => renderChip(index, chip))}
        </View>);
};

const styles = StyleSheet.create({
    activeTextStyles: {
        color: 'white',
    },
    inactiveTextStyles: {
        color: 'black'
    },
    activePillStyles: {
        borderWidth:1,
        borderColor: '#0096FF',
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        backgroundColor: '#0096FF',
        height: 30,
        borderRadius: 50,
        paddingRight: 5,
    },
    inactivePillStyles: {
        borderWidth:1,
        borderColor: 'lightgray',
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        width: 60,
        height: 30,
        borderRadius: 50,
        paddingRight: 5,
    },
});