import React from 'react';
import { ScrollView } from 'react-native';
import CryptoButton from '../cryptoButton';

const CryptoList = ({ cryptoPrices, selectedCrypto, onPress }) => (
  <ScrollView>
    {cryptoPrices.map((crypto) => (
      <CryptoButton
        key={crypto.id}
        crypto={crypto}
        selected={selectedCrypto === crypto.symbol}
        onPress={onPress}
      />
    ))}
  </ScrollView>
);

export default CryptoList;
