import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChartView from '../charts/ChartView.js';

export default function BusinessDetail(props) {
  const {name, location} = props.route.params;
  const revenue = props.route.params.revenue;
  console.log(revenue);

  function chartData() {
    var returnArr = [];

    //sort date past > most recent
    let rev = revenue.sort(function (a, b) {
      return (a.date > b.date) - (a.date < b.date);
    });

    var highDate = 0;

    // create objects that contain x and y values for the char
    for (let i = 0; i < rev.length; i++) {
      let dateStr = rev[i].date.replace(/-/g, '/');
      let date = new Date(dateStr);
      var month = date.getMonth();

      if (month > highDate) {
        highDate = month;
      }
      if (month < highDate) {
        month += 12;
      }
      let val = {
        x: month,
        y: rev[i].value,
      };
      returnArr.push(val);
    }
    return returnArr;
  }

  return (
    <View style={styles.fullPage}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.navigate('Home')}>
          <Image
            source={require('./assets/right-arrow-icon.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{location.address}</Text>
            <Text style={styles.address}>{location.city},</Text>
            <Text style={styles.country}>{location.country}</Text>
          </View>
          <View style={styles.chartBox}>
            <ChartView style={styles.chart} values={chartData(props)} />
            <Text style={styles.revenue}>past 6 months - monthly revenue</Text>
          </View>
        </View>
        <Image source={require('./assets/me.png')} style={styles.me} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullPage: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    width: 45,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  backButton: {
    backgroundColor: 'white',
    borderColor: '#303746',
    borderWidth: 1.5,
    justifyContent: 'center',
    padding: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
    marginVertical: 22,
  },
  arrow: {
    transform: [{scaleX: -1}],
    height: 18,
    width: 18,
    // resizeMode: 'contain',
  },
  chartBox: {
    margin: 10,
    borderRadius: 3,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
  },
  chart: {
    height: 350,
    width: 300,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 550,
    width: 350,
    backgroundColor: 'pink',
  },
  name: {
    color: '#303746',
    textTransform: 'lowercase',
    fontSize: 40,
    fontFamily: 'GillSans-UltraBold',
  },
  address: {
    color: '#303746',
    textTransform: 'lowercase',
    fontSize: 18,
    fontFamily: 'GillSans-UltraBold',
  },
  country: {
    color: '#303746',
    textTransform: 'lowercase',
    fontSize: 24,
    fontFamily: 'GillSans-UltraBold',
  },
  revenue: {
    color: '#303746',
    textTransform: 'lowercase',
    fontSize: 12,
    fontFamily: 'GillSans-UltraBold',
  },
  detailsContainer: {
    paddingTop: 12,
  },
  me: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    paddingTop: 100,
  },
});
