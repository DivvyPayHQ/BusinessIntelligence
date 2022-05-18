import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';


export const BusinessDetail = () => {
const {params: {item}} = useRoute();
console.log(item)
  return (
      <View style={{flex: 1}}>
        <Text>{item.name}</Text>
        <Text>{item.location.address}</Text>
        <Text>{item.location.city}</Text>
        <Text>{item.location.country}</Text>
      </View>
    );
}
