import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  width?: any;
}

export function PrimaryButton({ title, onPress, width = '100%' }: Props) {
  return (
    <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F2A31B',
    paddingVertical: 12,
    borderRadius: 15, // Mais arredondado conforme a imagem
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});