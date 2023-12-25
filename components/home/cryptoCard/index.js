import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './../../../pages/home/styles';

const CryptoCard = ({ crypto, onAddToWallet, onRemoveFromWallet, isAddedToWallet }) => (
  <View style={styles.cryptoCard}>
    <Image source={{ uri: crypto.image }} style={styles.cryptoImage} />
    <Text style={styles.cryptoText}>{crypto.symbol.toUpperCase()}</Text>
    <Text style={styles.cryptoText}>{crypto.name}</Text>
    <Text style={styles.cryptoText}>{`$${crypto.currentPrice
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
    {isAddedToWallet ? (
      <View style={styles.alreadyAddedContainer}>
        <TouchableOpacity style={styles.grayButton} onPress={onRemoveFromWallet}>
          <Text style={styles.grayButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={onAddToWallet} style={styles.greenButton}>
        <Text style={styles.addToWalletText}>Adicionar</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default CryptoCard;
