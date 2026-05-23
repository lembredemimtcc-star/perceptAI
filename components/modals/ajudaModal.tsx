import React from "react";

import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "../style/ajudaModal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AjudaModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            Ajuda da câmera
          </Text>

          <Text style={styles.message}>
            Utilize a câmera para detectar
            emoções do paciente em tempo
            real. Você pode trocar entre a
            câmera frontal e traseira usando
            o botão de câmera no canto da
            tela.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}