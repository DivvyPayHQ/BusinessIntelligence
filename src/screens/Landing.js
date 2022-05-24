import React from 'react';
import { Button, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const LandingScreen = () => {
    const { navigate } = useNavigation();
    const image = require('../assets/cityscapeBackground.jpg');
    const onPress = () => {navigate('Businesses')};
    return (
    <ImageBackground style={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between'}} source={image} resizeMode='cover'>
        <Text style={{marginTop: 50, textAlignVertical: 'center', color: 'white', borderWidth: 5, borderColor: 'white', borderRadius: 15, margin: 10, fontWeight: '700', padding: 10, backgroundColor: 'black', width: '90%', textAlign: 'center', fontSize: 32}}>Business Intelligence</Text>
        <TouchableOpacity style={{borderWidth: 5, borderColor: 'black', marginBottom: 150, width: '90%', borderRadius: 15, margin: 10, fontWeight: '700', padding: 10, backgroundColor: 'white', textAlign: 'center', fontSize: 32}} onPress={onPress}>
            <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>Enter</Text>
        </TouchableOpacity>
    </ImageBackground>
    );
};