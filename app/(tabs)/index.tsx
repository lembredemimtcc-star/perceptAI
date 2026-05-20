import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { styles } from "@/styles/home.styles";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { router } from "expo-router";

import React, { useMemo, useState } from "react";

import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number | null>(
    today.getDate()
  );

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = [2023, 2024, 2025, 2026];

  if (!fontsLoaded) return null;

  const calendarDays = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

    const totalDays = lastDay.getDate();

    let startWeekDay = firstDay.getDay();
    startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1;

    const daysArray = [];

    for (let i = 0; i < startWeekDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }

    return daysArray;
  }, [selectedMonth, selectedYear]);

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

          <View style={styles.instructionBoxCustom}>
            <Text style={styles.instructionTextCustom}>
              Para identificar as emoções de uma pessoa, utilize a nossa câmera
              e descubra como ela está se sentindo.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="Descubra aqui"
              onPress={() => router.push("/camera")}
              width="48%"
            />

            <SecondaryButton
              title="Acessar histórico"
              onPress={() => router.push("/historico")}
            />
          </View>
        </View>

        <View style={styles.sectionNoMargin}>
          <Text style={styles.sectionTitle}>Calendário</Text>

          <View style={styles.filtersContainer}>
            <TouchableOpacity
              style={styles.customSelect}
              onPress={() => setMonthModalVisible(true)}
            >
              <Text style={styles.customSelectText}>
                {months[selectedMonth]}
              </Text>

              <Text>▼</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.customSelect}
              onPress={() => setYearModalVisible(true)}
            >
              <Text style={styles.customSelectText}>{selectedYear}</Text>

              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              const isToday =
                day === today.getDate() &&
                selectedMonth === today.getMonth() &&
                selectedYear === today.getFullYear();

              const isSelected = selectedDay === day;

              // DIAS PASSADOS
              const isPast =
                day !== null &&
                new Date(selectedYear, selectedMonth, day) <
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

              // DIAS FUTUROS
              const isFuture =
                day !== null &&
                new Date(selectedYear, selectedMonth, day) >
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!day}
                  onPress={() => setSelectedDay(day)}
                  style={[
                    styles.dayBox,

                    day === null && styles.dayBoxEmpty,

                    // PASSADOS = LARANJA
                    isPast && styles.dayBoxPast,

                    // FUTUROS = CINZA
                    isFuture && styles.dayBoxFuture,

                    // HOJE
                    isToday && styles.dayBoxToday,

                    // SELECIONADO
                    isSelected && styles.dayBoxSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayLabel,

                      // texto cinza nos futuros
                      isFuture && styles.dayLabelPast,

                      // texto branco no hoje
                      isToday && styles.dayLabelToday,
                    ]}
                  >
                    {day || ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PrimaryButton
            title="Adicionar anotação"
            onPress={() => router.push("/anotacao")}
          />
        </View>
      </ScrollView>

      <Modal
        visible={monthModalVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setMonthModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o mês</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
            >
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.modalOption,
                    selectedMonth === index &&
                      styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedMonth(index);
                    setMonthModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      selectedMonth === index &&
                        styles.modalOptionTextSelected,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={yearModalVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setYearModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o ano</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
            >
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.modalOption,
                    selectedYear === year &&
                      styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedYear(year);
                    setYearModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      selectedYear === year &&
                        styles.modalOptionTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}