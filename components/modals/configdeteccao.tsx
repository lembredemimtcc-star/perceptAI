import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [threshold, setThreshold] = useState("75");

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  // Carrega as configurações salvas sempre que o modal se torna visível
  useEffect(() => {
    if (visible) {
      const loadConfig = async () => {
        try {
          const savedThreshold = await AsyncStorage.getItem("@perceptai:threshold");
          if (savedThreshold) {
            setThreshold(savedThreshold);
          }
          const savedHorario = await AsyncStorage.getItem("@perceptai:horario");
          if (savedHorario) {
            setHorario(savedHorario);
          }
          const savedDays = await AsyncStorage.getItem("@perceptai:days");
          if (savedDays) {
            setSelectedDays(JSON.parse(savedDays));
          }
        } catch (e) {
          console.error("Erro ao carregar configurações de detecção:", e);
        }
      };
      loadConfig();
    }
  }, [visible]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("@perceptai:threshold", threshold);
      await AsyncStorage.setItem("@perceptai:horario", horario);
      await AsyncStorage.setItem("@perceptai:days", JSON.stringify(selectedDays));
      onSave();
    } catch (e) {
      console.error("Erro ao salvar configurações de detecção:", e);
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

          <Text style={styles.label}>Limiar de Confiança (%)</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 75"
            keyboardType="numeric"
            value={threshold}
            onChangeText={setThreshold}
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
              onPress={handleSave}
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