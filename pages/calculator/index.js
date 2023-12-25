import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import BaseURLBrl from '../../services/baseURL/BaseURLBrl';
import CryptoList from '../../components/calculator/cryptoList';
import CalculatorResult from '../../components/calculator/calculatorResult';
import styles from './styles';

const CalculatorScreen = () => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch(BaseURLBrl);

      if (response.ok) {
        const cryptoData = await response.json();
        setCryptoPrices(
          cryptoData.map((data) => ({
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            currentPrice: parseFloat(data.current_price),
          }))
        );
      } else {
        throw new Error('Falha ao carregar preços das criptomoedas');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalValue = () => {
    const cryptoValue = parseFloat(cryptoAmount) * getCryptoPrice(selectedCrypto);

    const formattedValue = cryptoValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setTotalValue(formattedValue);
  };

  const getCryptoPrice = (cryptoSymbol) => {
    const crypto = cryptoPrices.find((item) => item.symbol === cryptoSymbol);
    return crypto ? crypto.currentPrice : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calculadora de Criptomoedas</Text>
      <Text style={styles.labelText}>Selecione uma criptomoeda:</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <CryptoList
          cryptoPrices={cryptoPrices}
          selectedCrypto={selectedCrypto}
          onPress={setSelectedCrypto}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Quantidade:</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={cryptoAmount}
          onChangeText={(text) => setCryptoAmount(text)}
        />
      </View>
      <TouchableOpacity style={styles.calculateButton} onPress={calculateTotalValue}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      <CalculatorResult totalValue={totalValue} />
    </View>
  );
};

export default CalculatorScreen;
