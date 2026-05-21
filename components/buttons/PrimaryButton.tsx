import React from 'react';
import { TouchableOpacity, Text, DimensionValue } from 'react-native';

import { styles } from '../style/primaryButton.styles';

interface Props {
  title: string;
  onPress: () => void;
  width?: DimensionValue; 
}

export function PrimaryButton({ title, onPress, width = '100%' }: Props) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={[styles.button, { width }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}