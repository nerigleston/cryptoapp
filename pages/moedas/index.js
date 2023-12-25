import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import BaseURLReal from '../../services/baseURL/BaseURLReal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CurrencyPage = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(BaseURLReal);

      if (response.ok) {
        const data = await response.json();
        setCurrencyData(data);
      } else {
        throw new Error('Falha ao carregar dados das moedas');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    fetchCurrencyData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Moedas em Relação ao Real</Text>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Icon name="autorenew" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <ScrollView>
          {currencyData &&
            Object.keys(currencyData).map((key) => {
              const currency = currencyData[key];
              return (
                <View key={key} style={styles.currencyItem}>
                  <Text>Código: {currency.code}</Text>
                  <Text>Código Internacional: {currency.codein}</Text>
                  <Text>Nome: {currency.name}</Text>
                  <Text>Valor: {currency.high}</Text>
                  <Text>Porcentagem de Variação: {currency.pctChange}</Text>
                  <Text>Compra: {currency.ask}</Text>
                  <Text>Venda: {currency.bid}</Text>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: 'gray',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrencyPage;
