import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import EmptyWalletMessage from '../../components/carteira/emptyWalletMessage';
import CryptoCard from '../../components/carteira/cryptoCard';

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
            <EmptyWalletMessage />
          ) : (
            walletCrypto.map((crypto, index) => (
              <CryptoCard key={index} crypto={crypto} />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default WalletPage;
