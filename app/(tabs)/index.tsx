import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CalendarModal } from "@/components/modals/CalendarModal";
import ConfirmacaoModal from "@/components/modals/confirmacaoModal";
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
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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
              </Text>
            </View>
          </TouchableOpacity>

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

        {/* ── CALENDÁRIO ── */}
        <View style={styles.sectionNoMargin}>
          <Text style={styles.sectionTitle}>Calendário</Text>

          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.customSelect} onPress={() => setMonthModalVisible(true)}>
              <Text style={styles.customSelectText}>{months[selectedMonth]}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customSelect} onPress={() => setYearModalVisible(true)}>
              <Text style={styles.customSelectText}>{selectedYear}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
              <Text key={d} style={styles.weekDayText}>{d}</Text>
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
            onPress={() => router.push("/anotacao-nova")}
          />
        </View>
      </ScrollView>

      {/* ── MODAIS ── */}
      <CalendarModal
        visible={monthModalVisible}
        title="Selecione o mês"
        options={months}
        selectedValue={months[selectedMonth]}
        onClose={() => setMonthModalVisible(false)}
        onSelect={(v) => setSelectedMonth(months.indexOf(v))}
      />
      <CalendarModal
        visible={yearModalVisible}
        title="Selecione o ano"
        options={years}
        selectedValue={selectedYear}
        onClose={() => setYearModalVisible(false)}
        onSelect={(v) => setSelectedYear(v)}
      />

      {/* Confirmation before opening camera */}
      <ConfirmacaoModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={() => {
          setConfirmModalVisible(false);
          router.push("/camera");
        }}
      />

      {/* Calendar day — shows real annotations for the tapped day */}
      <DiadoCalendario
        visible={dayModalVisible}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onClose={() => setDayModalVisible(false)}
      />
    </SafeAreaView>
  );
}
