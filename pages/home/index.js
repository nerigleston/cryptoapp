import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseURLDol from '../../services/baseURL/BaseURLDol';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import CryptoList from '../../components/home/cryptoList';

const CryptoListScreen = ({ navigation }) => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletCryptoIds, setWalletCryptoIds] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCryptoPrices();
      loadWalletData();
    };

    fetchData();

    const focusListener = navigation.addListener('focus', () => {
      loadWalletData();
    });

    return () => {
      focusListener();
    };
  }, [isFocused]);

  const loadWalletData = async () => {
    try {
      const walletData = await AsyncStorage.getItem('wallet');
      const wallet = walletData ? JSON.parse(walletData) : [];
      setWalletCryptoIds(wallet.map((crypto) => crypto.id));
    } catch (error) {
      console.error('Erro ao carregar dados da carteira:', error);
    }
  };

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
        throw new Error('Falha ao carregar preços de criptomoedas');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWallet = async (crypto) => {
    try {
      if (walletCryptoIds.includes(crypto.id)) {
        console.warn('Essa criptomoeda já está na sua carteira.');
        return;
      }

      const walletData = await AsyncStorage.getItem('wallet');
      const wallet = walletData ? JSON.parse(walletData) : [];

      wallet.push({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        currentPrice: crypto.currentPrice,
        image: crypto.image,
      });

      await AsyncStorage.setItem('wallet', JSON.stringify(wallet));
      await loadWalletData();

      console.log('Criptomoeda adicionada à carteira com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar à carteira:', error);
    }
  };

  const removeFromWallet = async (cryptoId) => {
    try {
      const walletData = await AsyncStorage.getItem('wallet');
      let wallet = walletData ? JSON.parse(walletData) : [];
      wallet = wallet.filter((crypto) => crypto.id !== cryptoId);
      await AsyncStorage.setItem('wallet', JSON.stringify(wallet));
      await loadWalletData();
      console.log('Criptomoeda removida da carteira com sucesso!');
    } catch (error) {
      console.error('Erro ao remover criptomoeda da carteira:', error);
    }
  };

  const handleReload = async () => {
    setIsLoading(true);
    await fetchCryptoPrices();
    loadWalletData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Preços das Criptomoedas em USD</Text>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Icon name="autorenew" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <CryptoList
        cryptoPrices={cryptoPrices}
        onAddToWallet={addToWallet}
        onRemoveFromWallet={removeFromWallet}
        walletCryptoIds={walletCryptoIds}
        isLoading={isLoading}
      />
    </View>
  );
};

export default CryptoListScreen;
