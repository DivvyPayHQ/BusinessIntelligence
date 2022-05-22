import { ReactElement } from 'react';
import { requireNativeComponent, NativeModules, ViewProps } from 'react-native';
console.log(NativeModules);
const BarChart = requireNativeComponent("BarChartModule");

export default BarChart;