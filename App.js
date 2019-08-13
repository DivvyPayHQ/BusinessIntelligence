/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Businesses from './screens/Businesses';
import BusinessDetail from './screens/BusinessDetail';

const MainNavigator = createStackNavigator({
  Home: {screen: Businesses},
  Profile: {screen: BusinessDetail},
});

const App = createAppContainer(MainNavigator);

export default App;

