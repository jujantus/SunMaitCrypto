import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';

export const CoinButton = ({coin, disabled, onPress}) => {
  const {symbol, name, percent_change_24h} = coin;
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[styles.buttonContainer, disabled && styles.disabledBackground]}>
        <Text style={styles.coinSymbol}>{symbol}</Text>
        <Text style={styles.coinName}>{name}</Text>
        <Text style={styles.percentChange}>{percent_change_24h}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
