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

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(
    today.getDate()
  );

  const [monthVisible, setMonthVisible] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);

  if (!fontsLoaded) return null;

  // 🔥 TODOS OS MESES
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

  // 🔥 ANOS
  const years = [2023, 2024, 2025, 2026];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

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
  }, [currentDate]);

  function handleMonthChange(month: number) {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setMonthVisible(false);
  }

  function handleYearChange(year: number) {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setYearVisible(false);
  }

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

          <View style={styles.calendarHeader}>
            {/* MÊS */}
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.customDropdown}
                onPress={() => {
                  setMonthVisible(!monthVisible);
                  setYearVisible(false);
                }}
              >
                <Text style={styles.dropdownText}>
                  {months[currentDate.getMonth()]}
                </Text>

                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>

              {monthVisible && (
                <View style={styles.dropdownMenu}>
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={true}
                  >
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={month}
                        style={styles.dropdownItem}
                        onPress={() => handleMonthChange(index)}
                      >
                        <Text style={styles.dropdownItemText}>{month}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* ANO */}
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.customDropdown}
                onPress={() => {
                  setYearVisible(!yearVisible);
                  setMonthVisible(false);
                }}
              >
                <Text style={styles.dropdownText}>
                  {currentDate.getFullYear()}
                </Text>

                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>

              {yearVisible && (
                <View style={styles.dropdownMenu}>
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={true}
                  >
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={styles.dropdownItem}
                        onPress={() => handleYearChange(year)}
                      >
                        <Text style={styles.dropdownItemText}>{year}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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
            {calendarDays.map((day, index) => {
              const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

              const isSelected = selectedDay === day;

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!day}
                  onPress={() => setSelectedDay(day)}
                  style={[
                    styles.dayBox,
                    day === null && styles.dayBoxEmpty,
                    day !== null && styles.dayBoxInactive,
                    isToday && styles.dayBoxActive,
                    isSelected && styles.dayBoxSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayLabel,
                      isToday && styles.dayLabelActive,
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
    </SafeAreaView>
  );
}