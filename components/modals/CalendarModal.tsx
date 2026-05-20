import React from "react";

import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { modalStyles } from "../style/modal.styles";

type CalendarModalProps = {
  visible: boolean;
  title: string;
  options: (string | number)[];
  selectedValue: string | number;
  onClose: () => void;
  onSelect: (value: any) => void;
};

export function CalendarModal({
  visible,
  title,
  options,
  selectedValue,
  onClose,
  onSelect,
}: CalendarModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        style={modalStyles.modalOverlay}
        onPress={onClose}
      >
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>{title}</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={modalStyles.modalScroll}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={String(option)}
                style={[
                  modalStyles.modalOption,
                  selectedValue === option &&
                    modalStyles.modalOptionSelected,
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text
                  style={[
                    modalStyles.modalOptionText,
                    selectedValue === option &&
                      modalStyles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}