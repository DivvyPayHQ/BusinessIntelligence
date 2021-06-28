import React from 'react';
import { get } from 'lodash';
import { StyleSheet, Text, View } from 'react-native';

export const PADDING_VERTICAL = 5;
export const NAME_HEIGHT = 21;
export const ADDRESS_HEIGHT = 14;
export const HEIGHT = PADDING_VERTICAL + PADDING_VERTICAL + NAME_HEIGHT + ADDRESS_HEIGHT;
const stylesheet = StyleSheet.create({
  container: {
    height: HEIGHT,
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 6,
  },

  name: {
    fontSize: 18,
    lineHeight: NAME_HEIGHT,
  },

  address: {
    fontSize: 12,
    lineHeight: ADDRESS_HEIGHT,
  },
});

export function BusinessItem({ location, name }) {
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.name}>{name}</Text>
      <Text style={stylesheet.address}>{get(location, 'address')}, {get(location, 'city')}</Text>
    </View>
  );
}

BusinessItem.HEIGHT = HEIGHT;

export default BusinessItem;
