import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CalendarModal } from "@/components/modals/CalendarModal";
import { DiadoCalendario } from "@/components/modals/DiadoCalendario";

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

  // ✅ estado do modal do dia
  const [dayModalVisible, setDayModalVisible] = useState(false);

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

    const daysArray: (number | null)[] = [];

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

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!day}
                  onPress={() => {
                    if (day !== null) {
                      setSelectedDay(day);
                      setDayModalVisible(true); // ✅ ABRE O MODAL
                    }
                  }}
                  style={[
                    styles.dayBox,
                    day === null && styles.dayBoxEmpty,
                    isToday && styles.dayBoxToday,
                    isSelected && styles.dayBoxSelected,
                  ]}
                >
                  <Text style={styles.dayLabel}>{day || ""}</Text>
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

      {/* MODAIS */}
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

      {/* ✅ MODAL DO DIA */}
      <DiadoCalendario
        visible={dayModalVisible}
        selectedDay={selectedDay}
        onClose={() => setDayModalVisible(false)}
      />
    </SafeAreaView>
  );
}