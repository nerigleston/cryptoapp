import React from 'react';
import { ScrollView } from 'react-native';
import CurrencyItem from './../currencyItem/index';

const CurrencyList = ({ currencyData }) => (
  <ScrollView>
    {currencyData &&
      Object.keys(currencyData).map((key) => (
        <CurrencyItem key={key} currency={currencyData[key]} />
      ))}
  </ScrollView>
);

export default CurrencyList;
