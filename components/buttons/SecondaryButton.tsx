import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function SecondaryButton({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F7E3C1', // Bege da imagem
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});