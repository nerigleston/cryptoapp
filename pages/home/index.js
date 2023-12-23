import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const CryptoListScreen = ({}) => {
  const [cryptoPrices, setCryptoPrices] = useState([]);

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
            image: data.image,
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

  return (
    <View>
      <Text style={styles.headerText}>Crypto Price Tracker</Text>
      <FlatList
        data={cryptoPrices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cryptoItemContainer}>
            <Image source={{ uri: item.image }} style={styles.cryptoImage} />
            <Text style={styles.cryptoText}>{item.symbol.toUpperCase()}</Text>
            <Text style={styles.cryptoText}>{item.name}</Text>
            <Text style={styles.cryptoText}>{`$${item.currentPrice.toFixed(2)}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cryptoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cryptoImage: {
    width: 45,
    height: 45,
  },
};

export default CryptoListScreen;
