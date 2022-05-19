import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export const Chip = ({options : {title, active}, onPress}) => {
    return (
        <TouchableOpacity onPress={(idx) => onPress(idx)} style={active ? styles.activePillStyles : styles.inactivePillStyles}>
            <Text style={active ? styles.activeTextStyles : styles.inactiveTextStyles}>{title}</Text>
        </TouchableOpacity>
    )
}

export const TimeRangeChips = (props) => {
    const { setTimeRange, defaultChips } = props;
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
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: 'blue',
        height: 30,
        borderRadius: 50,
        paddingRight: 5,
    },
    inactivePillStyles: {
        borderWidth:1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 70,
        height: 30,
        borderRadius: 50,
        paddingRight: 5,
    },
});