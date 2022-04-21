import * as React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, FlatList, View, StyleSheet, Image} from 'react-native';
import customData from '../data.json';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => props.navigation.navigate('Profile', {...props.item})}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={styles.ellipsis}>...</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Businesses({navigation}) {
  const renderItem = ({item}) => {
    return <Profile item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('./assets/divvy-blue.png')} style={styles.logo} /> */}
      <Text>
        <FlatList
          data={customData}
          // data={customData.slice(0, 10)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'pink',
    paddingHorizontal: 24,
    borderRadius: 50,
    width: 300,
    margin: 12,
  },
  name: {
    color: '#303746',
    textTransform: 'lowercase',
    fontSize: 24,
    marginTop: 14,
    fontFamily: 'GillSans-UltraBold',
  },
  ellipsis: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#303746',
    marginBottom: 16,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 25,
  },
});
