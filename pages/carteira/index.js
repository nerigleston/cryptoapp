import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletPage = ({ navigation }) => {
  const [walletCrypto, setWalletCrypto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadWalletData();
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  const loadWalletData = async () => {
    try {
      const walletData = await AsyncStorage.getItem('wallet');
      const wallet = walletData ? JSON.parse(walletData) : [];
      setWalletCrypto(wallet);
    } catch (error) {
      console.error('Erro ao carregar dados da carteira:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Minhas Criptomoedas</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <ScrollView>
          {walletCrypto.length === 0 ? (
            <View style={styles.emptyWalletContainer}>
              <Text style={styles.emptyWalletText}>
                Nenhuma criptomoeda adicionada. Por favor, acrescente suas criptomoedas favoritas à carteira.
              </Text>
            </View>
          ) : (
            walletCrypto.map((crypto, index) => (
              <View key={index} style={styles.cryptoCard}>
                <Image style={styles.cryptoImage} source={{ uri: crypto.image }} />
                <Text>{crypto.name}</Text>
                <Text>{`$${crypto.currentPrice
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
              </View>
            ))
          )}
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
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cryptoCard: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cryptoImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWalletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWalletText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
});

export default WalletPage;
