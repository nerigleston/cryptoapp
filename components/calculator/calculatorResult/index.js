import React from 'react';
import { View, Text } from 'react-native';
import styles from './../../../pages/calculator/styles';

const CalculatorResult = ({ totalValue }) => (
  <View>
    <Text style={styles.resultText}>Total em Reais: R${totalValue}</Text>
  </View>
);

export default CalculatorResult;
