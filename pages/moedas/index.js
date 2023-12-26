import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import BaseURLReal from '../../services/baseURL/BaseURLReal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CurrencyList from '../../components/moedas/currencyList';

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
      console.log(error);
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
        <CurrencyList currencyData={currencyData} />
      )}
    </View>
  );
};

export default CurrencyPage;
