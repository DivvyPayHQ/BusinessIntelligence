import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TimeRangeChips } from '../components/TimeRangeChips';
import { SortableHeader } from '../components/SortableHeader';
import { BarChart, LineChart } from '../components/Charts';
import { getRevenue, sortArray, mapDataPerTimeRange } from '../Transforms';
import { getBusinessData } from '../Services';
import { styles } from './styles/BusinessesStyles';
const ONE_MILLION = 1000000;

const BusinessRow = ({item, navigation, index, data}) => {
  const isAltStyle = index % 2 > 0; // Used for alternating color in table
  const originalItem = data.find(a => a.id === item.id) // Map the passed item to item in original data (So we dont pass sliced revenue)
  const onPress = () => navigation.navigate('BusinessDetails', {company: originalItem});
  const revenue = getRevenue(item?.revenue).formatted;
  return ( 
    <TouchableOpacity onPress={onPress} style={[styles.row, isAltStyle ? styles.alt : styles.notAlt]}>
      <Text style={styles.companyText}>{item.name}</Text>
      <View style={styles.revenueContainer}>
        <Text style={styles.revenueText}>{revenue}</Text>
        <Icon name='chevron-right'/>
      </View>
    </TouchableOpacity>
  )
}

export const Businesses = () => {
  const defaultChips = [{title: '1 mo', active: false}, {title: '3 mo', active: false}, {title: '6 mo', active: true}]; // Config for time range chips
  
  const [originalData, setOriginalData] = useState([]); // Keeping a copy of original data to create timerange display data from
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [displayData, setDisplayData] = useState([]); // List I will use that will get sliced and modified over time
  const [timeRange, setTimeRange] = useState(2); //1 mo = 0, 3 mo = 1, 6 mo = 2
  const [isAscending, setIsAscending] = useState();
  const [sortColumn, setSortColumn] = useState('Company');
  const [graphConfig, setGraphConfig] = useState({xAxis: [], yAxis: []});

  const navigation = useNavigation();

  // Get initial data
  useEffect(() => {
    getBusinessData().then((res) => {
      setIsLoading(false);
      setOriginalData(res);
      setDisplayData(res.map(company => ({...company, totalRevenue: getRevenue(company?.revenue).value})));
    }).catch((err) => {
      setIsLoading(false);
      setError(err);
    });
  }, []);

  // Listen to changes in display data and re render bar graph
  useEffect(() => {
      const xAxis = displayData.slice(0,7).map(company => company.name); // grab the first 5 only to display
      const yAxis = displayData.slice(0,7).map(company => company.totalRevenue/ONE_MILLION);
      setGraphConfig({xAxis, yAxis}); // setting the graph data
  }, [displayData]);

  // Sort based on column
  useEffect(() => {
    setDisplayData([...sortArray(displayData, sortColumn, isAscending)]);
  }, [isAscending]);

   // Set time range data and maintain sort
   useEffect(() => {
     if(originalData.length) {
      const slicedData = mapDataPerTimeRange(originalData, timeRange);
      setDisplayData(sortArray(slicedData, sortColumn,  isAscending));
    }
  }, [timeRange]);

  const renderItem = ({item, index}) => <BusinessRow navigation={navigation} item={item} index={index} data={originalData}></BusinessRow>;
  const renderBusinessHeader = () => {
    return (
      <View style={styles.businessHeader}>
        <SortableHeader title={'Company'} setSortColumn={setSortColumn} setIsAscending={setIsAscending} isAscending={isAscending}/>
        <View style={styles.headerDivider}></View>
        <SortableHeader title={'Revenue'} setSortColumn={setSortColumn} setIsAscending={setIsAscending} isAscending={isAscending}/>
      </View>
    )
  };

  if (isLoading) {
    return(
      <View style={[styles.container]}>
        <ActivityIndicator color='blue' size='large'/>
      </View>
    ) 
  };
  if (displayData.length) { 
    return (
          // {{opacity:0.5}} style={{width: '100%', height: '100%'}} source={require('../assets/cityscapeBackground.jpg')} resizeMode='cover'>
        <View style={styles.container}>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>Top 7 Companies (Million)</Text>
            <BarChart yAxis={graphConfig.yAxis} xAxis={graphConfig.xAxis} style={styles.graph}/>
          </View>
          <TimeRangeChips setTimeRange={setTimeRange} defaultChips={defaultChips}/>
          <FlatList
            data={displayData}
            ListHeaderComponent={renderBusinessHeader}
            stickyHeaderIndices={[0]} // So the header is fixed, not scrolling
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            keyExtractor={(item) => item.id + ''} //index should be string or react complains
          />
        </View>
  )};
  // Error State
  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Icon size={50} color='red' name='exclamation-triangle'/>
      <Text>{error}</Text>
    </View>
  );
};