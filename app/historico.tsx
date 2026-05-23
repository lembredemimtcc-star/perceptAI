import React, { useState } from "react";

import Header from "@/components/header/Header";
import { CalendarModal } from "@/components/modals/CalendarModal";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { styles } from "@/styles/historico.styles";

export default function HistoricoScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    today.getMonth()
  );

  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear()
  );

  const [monthModalVisible, setMonthModalVisible] =
    useState(false);

  const [yearModalVisible, setYearModalVisible] =
    useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* HEADER */}
          <Header title="Histórico" />

          {/* FILTROS */}
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
              <Text style={styles.customSelectText}>
                {selectedYear}
              </Text>

              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          {/* DIA */}
          <Text style={styles.dateTitle}>
            Dia 7 de março de 2026
          </Text>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Dor
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                18:34
              </Text>
            </View>
          </View>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Sono
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                18:22
              </Text>
            </View>
          </View>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Sede
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                17:30
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL MÊS */}
      <CalendarModal
        visible={monthModalVisible}
        title="Selecione o mês"
        options={months}
        selectedValue={months[selectedMonth]}
        onClose={() => setMonthModalVisible(false)}
        onSelect={(value) => {
          const monthIndex = months.indexOf(value);
          setSelectedMonth(monthIndex);
        }}
      />

      {/* MODAL ANO */}
      <CalendarModal
        visible={yearModalVisible}
        title="Selecione o ano"
        options={years}
        selectedValue={selectedYear}
        onClose={() => setYearModalVisible(false)}
        onSelect={(value) => {
          setSelectedYear(value);
        }}
      />
    </SafeAreaView>
  );
}