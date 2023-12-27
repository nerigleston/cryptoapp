import React, { useState } from 'react';
import { ScrollView, Button, View } from 'react-native';
import CurrencyItem from './../currencyItem/index';
import styles from './styles';

const ITEMS_PER_PAGE = 10;

const CurrencyList = ({ currencyData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = currentPage * ITEMS_PER_PAGE;

  const visibleCurrencyData = currencyData
    ? Object.keys(currencyData).slice(startIdx, endIdx).map((key) => currencyData[key])
    : [];

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <ScrollView>
      {visibleCurrencyData.map((currency, index) => (
        <CurrencyItem key={index} currency={currency} />
      ))}
      <View style={styles.buttonsItem}>
        <Button title="Anterior" onPress={handlePrevPage} disabled={currentPage === 1} />
        <Button title="Próxima" onPress={handleNextPage} disabled={endIdx >= Object.keys(currencyData || {}).length} />
      </View>
    </ScrollView>
  );
};

export default CurrencyList;
