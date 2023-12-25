import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './../../../pages/carteira/styles';

const CryptoCard = ({ crypto }) => (
  <View style={styles.cryptoCard}>
    <Image style={styles.cryptoImage} source={{ uri: crypto.image }} />
    <Text>{crypto.name}</Text>
    <Text>{`$${crypto.currentPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
  </View>
);

export default CryptoCard;
