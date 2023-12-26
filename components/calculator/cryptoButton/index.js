import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
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
    <Image source={{ uri: crypto.image }} style={{ width: 30, height: 30 }} />
  </TouchableOpacity>
);

export default CryptoButton;
