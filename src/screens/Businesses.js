import React, {useMemo} from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import data from '../../data.json'
import { useNavigation } from '@react-navigation/native';


const BusinessRow = ({item, navigation}) => {
  const onPress = () => navigation.navigate('Profile', {item});
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )
}

export const Businesses = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => <BusinessRow navigation={navigation} item={item}></BusinessRow>;
  const keyExtractor = (item, index) => item.id + '';
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data.slice(0, 20)}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    padding: 22,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})