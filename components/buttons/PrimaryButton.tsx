import React from 'react';
import { TouchableOpacity, Text, DimensionValue } from 'react-native';

import { styles } from '../style/primaryButton.styles';

interface Props {
  title: string;
  onPress: () => void;
<<<<<<< HEAD
  width?: DimensionValue;
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, width = '100%', disabled = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, { width }, disabled && styles.disabledButton]}
      onPress={disabled ? undefined : onPress}
=======
  width?: DimensionValue; 
}

export function PrimaryButton({ title, onPress, width = '100%' }: Props) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={[styles.button, { width }]} 
      onPress={onPress}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}