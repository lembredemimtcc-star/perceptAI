import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { styles } from "@/styles/home.styles";

export default function HomeScreen() {
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );

  const emptySlots = Array.from({ length: 4 }, (_, i) => `empty-${i}`);
  const calendarSlots = [...emptySlots, ...days];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identifique emoções</Text>
          <Text style={styles.description}>
            Para descobrir o que a pessoa está sentindo utilize a nossa câmera,
            assim descubra se ele está sentindo fome, sede, dor, medo, tristeza
            ou se ele está apertado ou enjoado e sua sensação térmica.
          </Text>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="Descubra aqui"
              onPress={() => {}}
              width="48%"
            />
            <SecondaryButton title="Acessar histórico" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.sectionNoMargin}>
          <Text style={styles.sectionTitle}>Histórico de anotações</Text>

          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              Clique em qualquer dia para visualizar as anotações registradas.
            </Text>
          </View>

          <View style={styles.calendarHeader}>
            <View style={styles.monthSelector}>
              <Text style={styles.monthText}>Fevereiro</Text>
            </View>

            <View style={styles.arrowButton}>
              <Ionicons name="chevron-down" size={24} color="#555" />
            </View>
          </View>

          <View style={styles.weekDaysContainer}>
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarSlots.map((item, index) => {
              const isDay = !item.startsWith("empty");

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!isDay}
                  style={[
                    styles.dayBox,
                    !isDay
                      ? styles.dayBoxEmpty
                      : item === "04"
                        ? styles.dayBoxActive
                        : styles.dayBoxInactive,
                  ]}
                >
                  <Text style={styles.dayLabel}>{isDay ? item : ""}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomButtonContainer}>
          <PrimaryButton title="Adicionar Anotação" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
