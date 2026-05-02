import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function SecondaryButton({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F7E3C1',
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