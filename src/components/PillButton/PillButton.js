import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const PillButton = ({onPress, text, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={
        disabled ? styles.disabledButtonContainer : styles.buttonContainer
      }>
      <Text style={disabled ? styles.disabledButtonText : styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
