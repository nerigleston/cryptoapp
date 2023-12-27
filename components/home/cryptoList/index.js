import React, { useState } from 'react';
import { View, ActivityIndicator, FlatList, Button } from 'react-native';
import CryptoCard from './../cryptoCard/index';
import styles from './styles';

const ITEMS_PER_PAGE = 15;

const CryptoList = ({
  cryptoPrices,
  onAddToWallet,
  onRemoveFromWallet,
  walletCryptoIds,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = currentPage * ITEMS_PER_PAGE;

  const visibleCryptoPrices = cryptoPrices.slice(startIdx, endIdx);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <>
          <FlatList
            data={visibleCryptoPrices}
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
          <View style={styles.buttonsItem}>
            <Button
              title="Anterior"
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            />
            <Button
              title="Próxima"
              onPress={handleNextPage}
              disabled={endIdx >= cryptoPrices.length}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CryptoList;
