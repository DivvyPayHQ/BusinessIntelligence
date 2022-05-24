import React, {useState, useEffect} from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const chartsImage = require('../assets/charts.jpg');
const officeImage = require('../assets/officeBackground.jpg');

export const LandingScreen = () => {
    const { navigate } = useNavigation();
    const [image, setImage] = useState(chartsImage);
    const changeBackground = () => {setImage(image === chartsImage ? officeImage : chartsImage)};
    const onPress = () => {navigate('Businesses')};

    return (
    <ImageBackground style={styles.ImageBackground} source={image} resizeMode='cover'>
        <TouchableOpacity style={styles.TitleContainer} onPress={changeBackground}>
            <Text style={styles.TitleText}>Business Intelligence</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
            <Text style={styles.ButtonText}>Enter</Text>
        </TouchableOpacity>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    TitleContainer: {
        marginTop: 10,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 15,
        margin: 10,
        backgroundColor: 'black',
        width: '90%'
    },
    TitleText: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: '700',
        padding: 10,
        textAlign: 'center',
        fontSize: 32
    },
    ButtonContainer: {
        borderWidth: 5,
        borderColor: 'black',
        marginBottom: 250,
        width: '90%',
        borderRadius: 15,
        margin: 10,
        padding: 10,
        backgroundColor: 'white'
    },
    ButtonText: {
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 20
    }
});