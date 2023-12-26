import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const CryptoButton = ({ crypto, selected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.radioOption,
      { backgroundColor: selected ? 'lightblue' : 'white' },
    ]}
    onPress={() => onPress(crypto.symbol)}
  >
    <Text>{crypto.name}</Text>
  </TouchableOpacity>
);

export default CryptoButton;
