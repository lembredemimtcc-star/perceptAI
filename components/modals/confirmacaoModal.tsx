import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../style/confirmacaoModal.styles";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function ConfirmacaoModal({
  visible,
  onConfirm,
  onClose,
  title = "Tem certeza?",
  message = "Deseja realmente continuar esta ação?",
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}