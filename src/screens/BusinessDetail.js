import React, {useEffect, useState} from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles/BusinessesStyles';
import { bigCurrencyFormatter } from '../Transforms';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const RevenueRow = ({item, index}) => {
  console.log(item)
  const isAlt = index % 2 > 0;
  const revenue = bigCurrencyFormatter(item?.value);
  const formattedMonth = moment(item.date, 'yyyy-MM-dd HH:mm:ss').format('MMM YY');
  return (
    <View style={[styles.row, isAlt ? styles.alt : styles.notAlt]}>
      <Text style={styles.companyText}>{formattedMonth}</Text>
      <Text style={[styles.revenueText, {alignSelf: 'flex-start', paddingLeft: 45}]}>{revenue}</Text>
    </View>
  )
}

export const BusinessDetail = () => {
  const {params: {company}} = useRoute();
  const {setOptions} = useNavigation(); // used to set company name to header
  useEffect(() => {
    setOptions({
      title: company?.name
    });
  }, []);

  const renderItem = ({item, index}) => <RevenueRow item={item} index={index}/>;
  const renderBusinessHeader = () => {
    return (
      <View style={[styles.businessHeader, {alignItems: 'flex-start'}]}>
        <Text style={[styles.headerText, {flex:1, padding: 16}]}>Month</Text>
        <View style={styles.headerDivider}/>
        <Text style={[styles.headerText, {flex: 1, padding: 16}]}>Revenue</Text>
      </View>
    )
  };
  return (
      <View style={styles.container}>
        <View style={styles.graphContainer}>
          <Text>A graph will go here</Text>
        </View>
         <FlatList
            data={company.revenue.reverse()} 
            ListHeaderComponent={renderBusinessHeader}
            stickyHeaderIndices={[0]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            keyExtractor={(item) => item.seq + ''} //index should be string or react complains
          />
      </View> 
    );
}
