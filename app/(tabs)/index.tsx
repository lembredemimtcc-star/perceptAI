import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CalendarModal } from "@/components/modals/CalendarModal";
import ConfirmacaoModal from "@/components/modals/confirmacaoModal";
import { DiadoCalendario } from "@/components/modals/DiadoCalendario";
<<<<<<< HEAD
import { styles } from "@/styles/home.styles";
=======

import { styles } from "@/styles/home.styles";

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
<<<<<<< HEAD
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
=======

import { router } from "expo-router";

import React, { useMemo, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

<<<<<<< HEAD
  // ── auth ─────────────────────────────────────────────────────────
  const { profile, user } = useAuth();
  const displayName = profile?.nome ?? user?.email?.split("@")[0] ?? "Cuidador";

  // ── calendar state ────────────────────────────────────────────────
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const years = [2023, 2024, 2025, 2026];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    let startWeekDay = firstDay.getDay();
    startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1;

    const days: (number | null)[] = [];
    for (let i = 0; i < startWeekDay; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
    return days;
  }, [selectedMonth, selectedYear]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── HEADER ── */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Bem-vindo(a), {displayName}</Text>
          <View style={styles.headerLine} />
        </View>

        {/* ── DETECÇÃO ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identifique emoções</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => setConfirmModalVisible(true)}>
            <View style={styles.instructionBoxCustom}>
              <Text style={styles.instructionTextCustom}>
                Para identificar as emoções de uma pessoa, utilize a nossa câmera e descubra como ela está se sentindo.
=======
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number | null>(
    today.getDate()
  );

  // ✅ modal confirmação
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // ✅ modal do calendário
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

          {/* ✅ TEXTO CLICÁVEL */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setConfirmModalVisible(true)}
          >
            <View style={styles.instructionBoxCustom}>
              <Text style={styles.instructionTextCustom}>
                Para identificar as emoções de uma pessoa, utilize a nossa
                câmera e descubra como ela está se sentindo.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="Descubra aqui"
              onPress={() => router.push("/camera")}
              width="48%"
            />
<<<<<<< HEAD
=======

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            <SecondaryButton
              title="Acessar histórico"
              onPress={() => router.push("/historico")}
            />
          </View>
        </View>

<<<<<<< HEAD
        {/* ── CALENDÁRIO ── */}
=======
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        <View style={styles.sectionNoMargin}>
          <Text style={styles.sectionTitle}>Calendário</Text>

          <View style={styles.filtersContainer}>
<<<<<<< HEAD
            <TouchableOpacity style={styles.customSelect} onPress={() => setMonthModalVisible(true)}>
              <Text style={styles.customSelectText}>{months[selectedMonth]}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customSelect} onPress={() => setYearModalVisible(true)}>
=======
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
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
              <Text style={styles.customSelectText}>{selectedYear}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
<<<<<<< HEAD
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
              <Text key={d} style={styles.weekDayText}>{d}</Text>
=======
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              const isToday =
                day === today.getDate() &&
                selectedMonth === today.getMonth() &&
                selectedYear === today.getFullYear();
<<<<<<< HEAD
=======

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
              const isSelected = selectedDay === day;

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!day}
                  onPress={() => {
                    if (day !== null) {
                      setSelectedDay(day);
<<<<<<< HEAD
=======

                      // ✅ abre o modal do calendário
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
                      setDayModalVisible(true);
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
<<<<<<< HEAD
            onPress={() => router.push("/anotacao-nova")}
=======
            onPress={() => router.push("/anotacao")}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
          />
        </View>
      </ScrollView>

<<<<<<< HEAD
      {/* ── MODAIS ── */}
=======
      {/* MODAIS */}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      <CalendarModal
        visible={monthModalVisible}
        title="Selecione o mês"
        options={months}
        selectedValue={months[selectedMonth]}
        onClose={() => setMonthModalVisible(false)}
<<<<<<< HEAD
        onSelect={(v) => setSelectedMonth(months.indexOf(v))}
      />
=======
        onSelect={(value) => {
          const monthIndex = months.indexOf(value);
          setSelectedMonth(monthIndex);
        }}
      />

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      <CalendarModal
        visible={yearModalVisible}
        title="Selecione o ano"
        options={years}
        selectedValue={selectedYear}
        onClose={() => setYearModalVisible(false)}
<<<<<<< HEAD
        onSelect={(v) => setSelectedYear(v)}
      />

      {/* Confirmation before opening camera */}
=======
        onSelect={(value) => {
          setSelectedYear(value);
        }}
      />

      {/* ✅ MODAL CONFIRMAÇÃO */}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      <ConfirmacaoModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={() => {
          setConfirmModalVisible(false);
<<<<<<< HEAD
          router.push("/camera");
        }}
      />

      {/* Calendar day — shows real annotations for the tapped day */}
      <DiadoCalendario
        visible={dayModalVisible}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
=======

          console.log("Confirmado");
        }}
      />

      {/* ✅ MODAL DIA DO CALENDÁRIO */}
      <DiadoCalendario
        visible={dayModalVisible}
        selectedDay={selectedDay}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        onClose={() => setDayModalVisible(false)}
      />
    </SafeAreaView>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
