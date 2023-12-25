import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseURLDol from '../../services/baseURL/BaseURLDol';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

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
      loadWalletData((wallet) => {
        setWalletCryptoIds(wallet.map((crypto) => crypto.id));
      });
    });

    return () => {
      focusListener();
    };
  }, [isFocused]);

  const loadWalletData = async (callback) => {
    try {
      const walletData = await AsyncStorage.getItem('wallet');
      const wallet = walletData ? JSON.parse(walletData) : [];
      setWalletCryptoIds(wallet.map((crypto) => crypto.id));
      if (callback) {
        callback(wallet);
      }
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
              <Text style={styles.cryptoText}>{`$${item.currentPrice
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
              {walletCryptoIds.includes(item.id) ? (
                <View style={styles.alreadyAddedContainer}>
                  <TouchableOpacity
                    style={styles.grayButton}
                    onPress={() => removeFromWallet(item.id)}
                  >
                    <Text style={styles.grayButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => addToWallet(item)} style={styles.greenButton}>
                  <Text style={styles.addToWalletText}>Adicionar</Text>
                </TouchableOpacity>
              )}
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
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  addToWalletText: {
    color: 'white',
    fontWeight: 'bold',
  },
  greenButton: {
    backgroundColor: 'green',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  grayButton: {
    backgroundColor: 'gray',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  grayButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alreadyAddedContainer: {
    alignItems: 'center',
  },
  alreadyAddedText: {
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CryptoListScreen;
