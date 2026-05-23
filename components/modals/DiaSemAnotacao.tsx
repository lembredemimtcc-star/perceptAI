import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../style/diaCalendario.styles";

type Props = {
  visible: boolean;
  selectedDay: number | null;
  onClose: () => void;
};

export default function DiaSemAnotacao({
  visible,
  selectedDay,
 onClose,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Dia {selectedDay}</Text>

          <Text style={styles.message}>
            Não há anotações no dia
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}