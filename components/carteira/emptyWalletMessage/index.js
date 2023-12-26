import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const EmptyWalletMessage = () => (
  <View style={styles.emptyWalletContainer}>
    <Text style={styles.emptyWalletText}>
      Nenhuma criptomoeda adicionada. Por favor, acrescente suas criptomoedas favoritas à carteira.
    </Text>
  </View>
);

export default EmptyWalletMessage;
