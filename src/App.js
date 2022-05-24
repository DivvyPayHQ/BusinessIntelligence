/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {Businesses} from './screens/Businesses';
import {BusinessDetail} from './screens/BusinessDetail';
import { LandingScreen } from './screens/Landing';

const MainNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator>
        <MainNavigator.Screen name="Home" component={LandingScreen} />
        <MainNavigator.Screen name="Businesses" component={Businesses} />
        <MainNavigator.Screen name="BusinessDetails" component={BusinessDetail} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
