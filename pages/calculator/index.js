import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

const CalculatorScreen = () => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoAmount, setCryptoAmount] = useState('0');
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple'
      );

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
    setTotalValue(cryptoValue);
  };

  const getCryptoPrice = (cryptoSymbol) => {
    const crypto = cryptoPrices.find((item) => item.symbol === cryptoSymbol);
    return crypto ? crypto.currentPrice : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calculadora de Criptomoedas</Text>

      <View style={styles.radioContainer}>
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
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Quantidade:</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={cryptoAmount}
          onChangeText={(text) => setCryptoAmount(text)}
        />
      </View>

      <Button title="Calcular" onPress={calculateTotalValue} />

      <Text style={styles.resultText}>Total em Reais: R${totalValue.toFixed(2)}</Text>
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
  labelText: {
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightblue',
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
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
  },
};

export default CalculatorScreen;
