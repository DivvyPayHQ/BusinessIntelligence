import React from 'react';
import data from '../../data.json';
import { get } from 'lodash';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BusinessItem from '../components/BusinessItem';

export function BusinessDetail() {
  const route = useRoute();
  const id = get(route, 'params.id');
  const business = data.find(({ id: businessId }) => businessId === id);

  return (
    <View>
      <BusinessItem {...business}/>
    </View>
  );
}

export default BusinessDetail;
