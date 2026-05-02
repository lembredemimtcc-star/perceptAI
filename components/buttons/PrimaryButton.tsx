import React from 'react';
import { TouchableOpacity, Text, StyleSheet, DimensionValue } from 'react-native';

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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F2A31B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold', // ✅ corrigido
    fontWeight: 'bold',
  },
});