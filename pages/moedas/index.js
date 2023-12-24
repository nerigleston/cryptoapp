import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

const CurrencyPage = () => {
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL,DOGE-BRL,USDT-BRL');

      if (response.ok) {
        const data = await response.json();
        setCurrencyData(data);
      } else {
        throw new Error('Failed to load currency data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Valores em Relação ao Real</Text>
      <ScrollView>
        {currencyData &&
          Object.keys(currencyData).map((key) => {
            const currency = currencyData[key];
            return (
              <View key={key} style={styles.currencyItem}>
                <Text>Código: {currency.code}</Text>
                <Text>Código Internacional: {currency.codein}</Text>
                <Text>Nome: {currency.name}</Text>
                <Text>Compra (Bid): {currency.bid}</Text>
                <Text>Venda (Ask): {currency.ask}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  currencyItem: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightblue',
    marginBottom: 10,
  },
};

export default CurrencyPage;
