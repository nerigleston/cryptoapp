import React from 'react';
import { View, Text } from 'react-native';
import styles from './../../../pages/moedas/styles';

const CurrencyItem = ({ currency }) => (
  <View style={styles.currencyItem}>
    <Text>Código: {currency.code}</Text>
    <Text>Código Internacional: {currency.codein}</Text>
    <Text>Nome: {currency.name}</Text>
    <Text>Valor: {currency.high}</Text>
    <Text>Porcentagem de Variação: {currency.pctChange}</Text>
    <Text>Compra: {currency.ask}</Text>
    <Text>Venda: {currency.bid}</Text>
  </View>
);

export default CurrencyItem;
