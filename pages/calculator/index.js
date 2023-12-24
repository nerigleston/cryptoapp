import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BaseURLBrl from '../../services/baseURL/BaseURLBrl';

const CalculatorScreen = () => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoAmount, setCryptoAmount] = useState('0');
  const [totalValue, setTotalValue] = useState('0,00');

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
        throw new Error('Failed to load crypto prices');
      }
    } catch (error) {
      console.error(error);
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
      <ScrollView>
        {cryptoPrices.map((crypto) => (
          <TouchableOpacity
            key={crypto.id}
            style={[
              styles.radioOption,
              { backgroundColor: selectedCrypto === crypto.symbol ? 'lightblue' : 'white' },
            ]}
            onPress={() => setSelectedCrypto(crypto.symbol)}
          >
            <Text>{crypto.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Quantidade:</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={cryptoAmount}
          onChangeText={(text) => setCryptoAmount(text)}
        />
      </View>
      <TouchableOpacity
        style={[styles.calculateButton]}
        onPress={calculateTotalValue}
      >
        <Text style={[styles.buttonText]}>Calcular</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Total em Reais: R${totalValue}</Text>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  labelText: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  radioOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  calculateButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default CalculatorScreen;
