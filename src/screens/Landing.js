import React, { useState } from 'react';
import { Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles/LandingScreen';

import chartsImage from '../assets/charts.jpg';
import officeImage from '../assets/officeBackground.jpg';

export default function LandingScreen() {
	const { navigate } = useNavigation();
	const [image, setImage] = useState(chartsImage);
	const changeBackground = () => { setImage(image === chartsImage ? officeImage : chartsImage); };
	const onPress = () => { navigate('Businesses'); };

	return (
		<ImageBackground style={styles.ImageBackground} source={image} resizeMode="cover">
			<TouchableOpacity style={styles.TitleContainer} onPress={changeBackground}>
				<Text style={styles.TitleText}>Business Intelligence</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
				<Text style={styles.ButtonText}>Enter</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
}
