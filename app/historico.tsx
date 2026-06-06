import React, { useState, useEffect } from "react";

import Header from "@/components/header/Header";
import { CalendarModal } from "@/components/modals/CalendarModal";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { styles } from "@/styles/historico.styles";
import { supabase, fetchDetections } from "@/services/api";
import { Detection } from "@/types/emotion";

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

  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Carrega as detecções do Supabase e inscreve canal Realtime
  useEffect(() => {
    const loadDetectionsData = async () => {
      try {
        setLoading(true);
        const data = await fetchDetections();
        setDetections(data);
      } catch (err) {
        console.error("Erro ao carregar histórico de detecções:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDetectionsData();

    // Inscreve-se ao vivo na tabela 'detections'
    const channel = supabase
      .channel("realtime-detections")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "detections" },
        (payload) => {
          console.log("Nova detecção capturada em tempo real:", payload.new);
          const newDetection = payload.new as Detection;
          setDetections((prev) => [newDetection, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!fontsLoaded) return null;

  // Filtra as detecções de acordo com o mês e ano selecionados
  const filteredDetections = detections.filter((item) => {
    const d = new Date(item.timestamp);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  // Auxiliar para agrupamento por data (evita repetir o cabeçalho do mesmo dia)
  let lastDateStr = "";

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

          {loading ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#F2A31B" />
              <Text style={{ marginTop: 10, fontFamily: "Poppins_400Regular", color: "#666" }}>
                Carregando histórico...
              </Text>
            </View>
          ) : filteredDetections.length === 0 ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#999" }}>
                Nenhuma detecção registrada
              </Text>
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 13, color: "#BBB", textAlign: "center", marginTop: 5 }}>
                Não há detecções críticas de microexpressões para o mês selecionado.
              </Text>
            </View>
          ) : (
            filteredDetections.map((item) => {
              const date = new Date(item.timestamp);
              // Obtém a data local formatada DD/MM/AAAA para agrupamento
              const dateStr = date.toLocaleDateString("pt-BR");
              const showHeader = dateStr !== lastDateStr;
              lastDateStr = dateStr;

              const formattedTime = date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              // Capitaliza o nome da emoção
              const capitalizedEmotion = item.tipo_emocao.charAt(0).toUpperCase() + item.tipo_emocao.slice(1);

              return (
                <View key={item.id} style={{ width: "100%" }}>
                  {showHeader && (
                    <Text style={styles.dateTitle}>
                      Dia {date.getDate()} de {months[date.getMonth()].toLowerCase()} de {date.getFullYear()}
                    </Text>
                  )}

                  {/* ITEM */}
                  <View style={styles.historyItem}>
                    <View style={styles.emotionBox}>
                      <Text style={styles.emotionText}>
                        Emoção: {capitalizedEmotion} {item.confianca ? `(${(item.confianca * 100).toFixed(0)}%)` : ""}
                      </Text>
                    </View>

                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>
                        {formattedTime}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
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