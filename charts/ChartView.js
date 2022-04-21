import {requireNativeComponent} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

function ChartView(props) {
  return <RNTChart {...props} />;
}

ChartView.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ),
};

let RNTChart = requireNativeComponent('RNTChart');
module.exports = ChartView;
