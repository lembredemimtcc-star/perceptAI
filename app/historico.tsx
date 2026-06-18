import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import Header from "@/components/header/Header";
import { CalendarModal } from "@/components/modals/CalendarModal";
import { styles } from "@/styles/historico.styles";
import { supabase, fetchDetections } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Detection } from "@/types/emotion";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • detections – fetched via RLS (only rows for this cuidador's patients)
//   • alerts     – new detections auto-create alert rows (handled in api.ts)
//   Realtime channel subscribes to INSERT on detections.
// ─────────────────────────────────────────────────────────────────────

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const YEARS = [2023, 2024, 2025, 2026];

export default function HistoricoScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const { user, isLoading } = useAuth();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ── Initial load + Realtime subscription ─────────────────────────

  useEffect(() => {
    if (isLoading || !user?.id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        // fetchDetections relies on RLS to filter by cuidador's patients
        const data = await fetchDetections();
        setDetections(data);
      } catch (err: any) {
        console.error("Erro ao carregar histórico:", err);
        setLoadError(err?.message ?? "Falha ao carregar histórico.");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Live updates: new detections pushed by the C# backend appear instantly
    const channel = supabase
      .channel("realtime-detections")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "detections" },
        (payload) => {
          const incoming = payload.new as Detection;
          setDetections((prev) => [incoming, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLoading, user?.id]);

  if (!fontsLoaded) return null;

  // ── Filter to selected month/year ────────────────────────────────

  const filtered = detections.filter((item) => {
    const d = new Date(item.timestamp);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  // Grouping helper
  let lastDateStr = "";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Header title="Histórico" />

          {/* ── FILTERS ── */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.customSelect} onPress={() => setMonthModalVisible(true)}>
              <Text style={styles.customSelectText}>{MONTHS[selectedMonth]}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customSelect} onPress={() => setYearModalVisible(true)}>
              <Text style={styles.customSelectText}>{selectedYear}</Text>
              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          {/* ── CONTENT ── */}
          {loading ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#F2A31B" />
              <Text style={{ marginTop: 10, fontFamily: "Poppins_400Regular", color: "#666" }}>
                Carregando histórico...
              </Text>
            </View>
          ) : loadError ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#E63946" }}>
                {loadError}
              </Text>
            </View>
          ) : filtered.length === 0 ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#999" }}>
                Nenhuma detecção registrada
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#BBB",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Não há detecções críticas para o período selecionado.
              </Text>
            </View>
          ) : (
            filtered.map((item) => {
              const d = new Date(item.timestamp);
              const dateStr = d.toLocaleDateString("pt-BR");
              const showHeader = dateStr !== lastDateStr;
              lastDateStr = dateStr;

              const formattedTime = d.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const emotion =
                item.tipo_emocao.charAt(0).toUpperCase() + item.tipo_emocao.slice(1);

              return (
                <View key={item.id} style={{ width: "100%" }}>
                  {showHeader && (
                    <Text style={styles.dateTitle}>
                      Dia {d.getDate()} de {MONTHS[d.getMonth()].toLowerCase()} de {d.getFullYear()}
                    </Text>
                  )}
                  <View style={styles.historyItem}>
                    <View style={styles.emotionBox}>
                      <Text style={styles.emotionText}>
                        Emoção: {emotion}{" "}
                        {item.confianca ? `(${(item.confianca * 100).toFixed(0)}%)` : ""}
                      </Text>
                    </View>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>{formattedTime}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* ── MODALS ── */}
      <CalendarModal
        visible={monthModalVisible}
        title="Selecione o mês"
        options={MONTHS}
        selectedValue={MONTHS[selectedMonth]}
        onClose={() => setMonthModalVisible(false)}
        onSelect={(v) => setSelectedMonth(MONTHS.indexOf(v))}
      />
      <CalendarModal
        visible={yearModalVisible}
        title="Selecione o ano"
        options={YEARS}
        selectedValue={selectedYear}
        onClose={() => setYearModalVisible(false)}
        onSelect={(v) => setSelectedYear(v)}
      />
    </SafeAreaView>
  );
}
