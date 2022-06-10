import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styles } from './styles/BusinessesStyles';
import { bigCurrencyFormatter, getLineChartData, formatDate } from '../Transforms';
import { LineChart } from '../components/Charts';

function RevenueRow({ item, index }) {
  const isAlt = index % 2 > 0;
  const revenue = bigCurrencyFormatter(item.value); // makes the revenue value formatted
  const formattedMonth = formatDate(item.date); // creates date column value
  return (
    <View style={[styles.row, isAlt ? styles.alt : styles.notAlt]}>
      <Text style={styles.companyText}>{formattedMonth}</Text>
      <Text style={[styles.revenueText, { alignSelf: 'flex-start', paddingLeft: 45 }]}>{revenue}</Text>
    </View>
  );
}

export const BusinessDetail = () => {
  const { params: { company } } = useRoute();
  const { setOptions } = useNavigation(); // used to set company name to header
  const [graphConfig, setGraphConfig] = useState({ xAxis: [], yAxis: [] });

  useEffect(() => {
    setOptions({
      title: company?.name,
    });
    setGraphConfig(getLineChartData(company));
  }, []);

  const renderItem = ({ item, index }) => <RevenueRow item={item} index={index} />;
  const renderBusinessHeader = () => (
    <View style={[styles.businessHeader, { alignItems: 'flex-start' }]}>
      <Text style={[styles.headerText, { flex: 1, padding: 16 }]}>Month</Text>
      <View style={styles.headerDivider} />
      <Text style={[styles.headerText, { flex: 1, padding: 16 }]}>Revenue</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={styles.graphTitle}>6 Month Trend (Millions)</Text>
          <View style={{
            width: 150, backgroundColor: 'white', padding: 5, borderWidth: 1, borderColor: 'lightgray', borderRadius: 7,
          }}
          >
            <Text style={styles.locationText} numberOfLines={1}>{company.name}</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {company.location.address}
              {' '}
            </Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {company.location.city}
              ,
              {' '}
              {company.location.country}
            </Text>
          </View>
        </View>
        <LineChart style={styles.graph} xAxis={graphConfig.xAxis} yAxis={graphConfig.yAxis} />
      </View>
      <FlatList
        data={company.revenue.reverse()} // oldest to newest direction
        ListHeaderComponent={renderBusinessHeader}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View styles={styles.itemSeparator} />}
        keyExtractor={(item) => `${item.seq}`}
      />
    </View>
  );
};
