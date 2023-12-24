import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import BaseURLDol from '../../services/baseURL/BaseURLDol';

const CryptoListScreen = () => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch(BaseURLDol);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Preços das Criptomoedas em USD</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <FlatList
          data={cryptoPrices}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.cryptoCard}>
              <Image source={{ uri: item.image }} style={styles.cryptoImage} />
              <Text style={styles.cryptoText}>{item.symbol.toUpperCase()}</Text>
              <Text style={styles.cryptoText}>{item.name}</Text>
              <Text style={styles.cryptoText}>{`$${item.currentPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cryptoCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  cryptoImage: {
    width: 45,
    height: 45,
  },
  cryptoText: {
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CryptoListScreen;
