import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import styles from "../style/configuracaoDeteccaoModal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function ConfiguracaoDeteccaoModal({
  visible,
  onClose,
  onSave,
}: Props) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [horario, setHorario] = useState("");

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            Configuração de detecção
          </Text>

          <Text style={styles.label}>Horário</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 14:30"
            value={horario}
            onChangeText={setHorario}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Dias da semana</Text>

          <View style={styles.daysContainer}>
            {days.map((day) => {
              const isSelected = selectedDays.includes(day);

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    isSelected && styles.dayButtonSelected,
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      isSelected && styles.dayButtonTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}