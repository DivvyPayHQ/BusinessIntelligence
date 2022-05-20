import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TimeRangeChips } from '../components/TimeRangeChips';
import { SortableHeader } from '../components/SortableHeader';
import { getRevenue, sortArray } from '../Transforms';
import { getBusinessData } from '../Services';
import { styles } from './styles/BusinessesStyles';

const BusinessRow = ({item, navigation}) => {
  // console.log(item)
  const onPress = () => navigation.navigate('Profile', {item});
  const revenue = getRevenue(item?.revenue).formatted;
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={styles.text}>{item.name}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>{revenue}</Text>
        <Icon style={{paddingLeft: 12}} name='chevron-right'/>
      </View>
    </TouchableOpacity>
  )
}

export const Businesses = () => {
  const defaultChips = [{title: '1 Mo', active: false}, {title: '3 Mo', active: false}, {title: '6 Mo', active: true}];
  const timeRangeMap = { 0: 1, 1: 3, 2: 5}; //Which timerange corresponds to how many months
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState([]);
  const [timeRange, setTimeRange] = useState(2); //1 mo = 0, 3 mo = 1, 6 mo = 2
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('Company');

  const navigation = useNavigation();
  const renderItem = ({item}) => <BusinessRow navigation={navigation} item={item}></BusinessRow>;
  const renderBusinessHeader = () => {
    return (
      <View style={styles.businessHeader}>
        <SortableHeader title={'Company'} setSortColumn={setSortColumn} setSortDirection={setSortDirection} sortDirection={sortDirection}/>
        <View style={{height: '100%', width: 1, backgroundColor: 'gray'}}></View>
        <SortableHeader title={'Revenue'} setSortColumn={setSortColumn} setSortDirection={setSortDirection} sortDirection={sortDirection}/>
      </View>
    )
  };

  // Get initial data
  useEffect(() => {
    getBusinessData().then((res) => {
      setIsLoading(false);
      setOriginalData(res);
      setDisplayData(res.map(company => {
        return { 
          ...company, 
          totalRevenue: getRevenue(company?.revenue).value, // Will be used for sorting 
        }
      }));
    })
    .catch(() => {
      setIsLoading(false);
    });
  }, []);

  // Set time range data and add sort field
  useEffect(() => {
    setDisplayData(originalData.map(company => {
      const slicedRev = company?.revenue?.slice(0,timeRangeMap[timeRange]);
      return { 
        ...company, 
        revenue: slicedRev, 
        totalRevenue: getRevenue(slicedRev).value // Will be used for sorting 
      }
    }));
  }, [timeRange]);

  // Sort based on column
  useEffect(() => {
    console.log(sortDirection);
      if (sortColumn === 'Company') {
        sortDirection === 'asc' ? setDisplayData(sortArray(displayData, 'asc', 'name'))
          : setDisplayData(sortArray(displayData, 'desc', 'name'));
      }
      else if (sortColumn === 'Revenue') {
        sortDirection === 'asc' ? setDisplayData(sortArray(displayData, 'asc', 'totalRevenue'))
          : setDisplayData(sortArray(displayData, 'desc', 'totalRevenue'));
      }
  }, [sortDirection, sortColumn]);

  if (isLoading) { return(<ActivityIndicator color='blue' size='large'/>) };
  if (displayData.length) { 
    return (
          // {{opacity:0.5}} style={{width: '100%', height: '100%'}} source={require('../assets/cityscapeBackground.jpg')} resizeMode='cover'>
        <SafeAreaView style={styles.container}>
          <View style={styles.graphContainer}>
          <Text>A graph will go here</Text>
        </View>
        <TimeRangeChips setTimeRange={setTimeRange} defaultChips={defaultChips}/>
          <FlatList
            data={displayData}
            ListHeaderComponent={renderBusinessHeader}
            stickyHeaderIndices={[0]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            keyExtractor={(item) => item.id + ''}
          />
        </SafeAreaView>
  )};
  return (<Icon name='exclamation-triangle'/>);
};