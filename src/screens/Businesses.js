import React, {useMemo, useState, useEffect} from 'react';
import { FlatList, Text, StyleSheet, View,
  ImageBackground, SectionList, TouchableOpacity } from 'react-native';
import data from '../../data.json'
import { ThemeProvider, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../Theme';
import { getRevenue } from '../Transforms';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TimeRangeChips } from '../components/TimeRangeChips';

const BusinessRow = ({item, navigation, timeRange}) => {
  const onPress = () => navigation.navigate('Profile', {item});
  const revenue = getRevenue(timeRange, item);
  console.log(timeRange);
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text>{item.name}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{revenue}</Text>
        <Icon style={{paddingLeft: 12}} name='chevron-right'/>
      </View>
    </TouchableOpacity>
  )
}

export const Businesses = () => {
  const DATA = data.slice(0,20);
  const defaultChips = [{title: '1 Mo', active: false}, {title: '3 Mo', active: false}, {title: '6 Mo', active: true}]
  const [timeRange, setTimeRange] = useState(2); //1 mo = 0, 3 mo = 1, 6 mo = 2
  const navigation = useNavigation();
  const renderItem = ({item}) => <BusinessRow timeRange={timeRange} navigation={navigation} item={item}></BusinessRow>;
  const renderBusinessHeader = () => {
    return (
      <View style={styles.businessHeader}>
        <Text style={styles.headerText}>Company</Text>
        <Text style={[styles.headerText, {paddingRight: 6}]}>Revenue</Text>
      </View>
    )
  };

  const keyExtractor = (item, index) => item.id + '';
  // useEffect(() => {
  //   console.log(timeRange);
  //   switch(timeRange) {
  //     case 0:
  //       setCompanyData(DATA.map(company => {
  //         return {...company, revenue: company?.revenue?.slice(0,1)};
  //       }));
  //       break;
  //     case 1:
  //       setCompanyData(DATA.map(company => ({...company, revenue: company?.revenue?.slice(0,3)})));
  //       break;
  //     default:
  //       setCompanyData(DATA.map(company => ({...company, revenue: company?.revenue?.slice(0,6)})));
  //       break;
  //   }
  // }, [timeRange])
   return (
// {{opacity:0.5}} style={{width: '100%', height: '100%'}} source={require('../assets/cityscapeBackground.jpg')} resizeMode='cover'>
      <SafeAreaView style={styles.container}>
        <View style={styles.graphContainer}>
         <Text>A graph will go here</Text>
       </View>
       <TimeRangeChips setTimeRange={setTimeRange} defaultChips={defaultChips}/>
        <FlatList
          data={DATA}
          ListHeaderComponent={renderBusinessHeader}
          stickyHeaderIndices={[0]}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  graphContainer: {
    height: 300,
    width: '100%',
  },
  businessHeader: {
    padding: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    borderTopColor: Colors.Gray,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    padding: 22,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.Gray,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
  }
})