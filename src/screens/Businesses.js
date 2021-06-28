import React from 'react';
import data from '../../data.json';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { generateComponent, generateKeyExtractor } from '../utilities/flatlist';
import BusinessItem from '../components/BusinessItem';

/**
 * Get flat list layout.
 *
 * @param {object} data - Item
 * @param {number} index - Order of items
 *
 * @returns {object} layout - Object of length and offset for FlatList.
 */
export function getItemLayout(data, index) {
  return { index, length: BusinessItem.HEIGHT, offset: BusinessItem.HEIGHT * index };
}

const stylesheet = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  },
});

export function Businesses() {
  return (
    <FlatList
      data={data}
      getItemLayout={getItemLayout}
      initialNumToRender={2}
      keyExtractor={generateKeyExtractor({ key: 'id' })}
      renderItem={generateComponent({ Component: BusinessItem, shouldSpreadItem: true })}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={generateComponent({ Component: View, style: stylesheet.separator })}
    />
  );
}

export default Businesses;
