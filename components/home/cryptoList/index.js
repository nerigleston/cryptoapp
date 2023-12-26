import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import CryptoCard from './../cryptoCard/index';
import styles from './styles';

const CryptoList = ({
  cryptoPrices,
  onAddToWallet,
  onRemoveFromWallet,
  walletCryptoIds,
  isLoading,
}) => (
  <View style={styles.container}>
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
          <CryptoCard
            crypto={item}
            onAddToWallet={() => onAddToWallet(item)}
            onRemoveFromWallet={() => onRemoveFromWallet(item.id)}
            isAddedToWallet={walletCryptoIds.includes(item.id)}
          />
        )}
      />
    )}
  </View>
);

export default CryptoList;
