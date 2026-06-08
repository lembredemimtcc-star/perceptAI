import React, { useCallback, useEffect, useState } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { supabase, fetchAllAlerts, markAlertAsRead, markAllAlertsAsRead } from "@/services/api";
import { Alert as AlertRow } from "@/types/emotion";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • alerts     – SELECT all, UPDATE lido=true (mark as read)
//   • detections – joined via "detection:detections(*)"
//   Realtime: subscribes to INSERT on alerts so new ones appear live.
// ─────────────────────────────────────────────────────────────────────

const EMOTION_LABELS: Record<string, string> = {
  medo: "Medo",
  enjoo: "Enjoo",
  dor: "Dor",
  sono: "Sono",
  tristeza: "Tristeza",
};

export default function AlertasScreen() {
  const { user, isLoading } = useAuth();
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // ── Load + Realtime ───────────────────────────────────────────────

  const loadAlerts = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setLoadError(null);

    try {
      const data = await fetchAllAlerts(user.id);
      setAlerts(data);
    } catch (err: any) {
      console.error("Erro ao carregar alertas:", err);
      setLoadError(err?.message ?? "Falha ao carregar alertas.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoading || !user?.id) return;

    loadAlerts();

    // Live insertion of new alerts (triggered by C# backend or saveDetection)
    const channel = supabase
      .channel("realtime-alerts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
          filter: `cuidador_id=eq.${user.id}`,
        },
        (payload) => {
          const incoming = payload.new as AlertRow;
          setAlerts((prev) => [incoming, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLoading, user?.id, loadAlerts]);

  // ── Actions ───────────────────────────────────────────────────────

  async function handleMarkRead(alertId: string) {
    try {
      await markAlertAsRead(alertId);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, lido: true } : a))
      );
    } catch (err) {
      console.error("Erro ao marcar alerta como lido:", err);
    }
  }

  async function handleMarkAllRead() {
    if (!user?.id) return;
    try {
      await markAllAlertsAsRead(user.id);
      setAlerts((prev) => prev.map((a) => ({ ...a, lido: true })));
    } catch (err) {
      console.error("Erro ao marcar todos como lidos:", err);
    }
  }

  if (!fontsLoaded) return null;

  const unreadCount = alerts.filter((a) => !a.lido).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Header title="Alertas" />

          {/* Mark all read */}
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={handleMarkAllRead}
              style={{
                alignSelf: "flex-end",
                backgroundColor: "#F2A31B",
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 13 }}>
                Marcar todos como lidos ({unreadCount})
              </Text>
            </TouchableOpacity>
          )}

          {/* List */}
          {loading ? (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#F2A31B" />
            </View>
          ) : loadError ? (
            <Text style={{ color: "#E63946", fontFamily: "Poppins_400Regular", marginTop: 20 }}>
              {loadError}
            </Text>
          ) : alerts.length === 0 ? (
            <View style={{ marginTop: 60, alignItems: "center" }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#999" }}>
                Nenhum alerta ainda
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#BBB",
                  textAlign: "center",
                  marginTop: 6,
                }}
              >
                Alertas aparecem aqui quando emoções críticas são detectadas.
              </Text>
            </View>
          ) : (
            alerts.map((alert) => {
              const detection = alert.detection;
              const emotion = detection?.tipo_emocao
                ? EMOTION_LABELS[detection.tipo_emocao] ?? detection.tipo_emocao
                : "—";
              const confidence = detection?.confianca
                ? `${(detection.confianca * 100).toFixed(0)}%`
                : "";
              const when = new Date(alert.created_at).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <View
                  key={alert.id}
                  style={{
                    backgroundColor: alert.lido ? "#F2F2F2" : "#FFF3DC",
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 12,
                    borderLeftWidth: 4,
                    borderLeftColor: alert.lido ? "#CCC" : "#F2A31B",
                  }}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 15, color: "#000" }}>
                      {emotion} {confidence}
                    </Text>
                    {!alert.lido && (
                      <TouchableOpacity onPress={() => handleMarkRead(alert.id)}>
                        <Text
                          style={{ fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "#F2A31B" }}
                        >
                          Marcar lido
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text
                    style={{ fontFamily: "Poppins_400Regular", fontSize: 12, color: "#666", marginTop: 4 }}
                  >
                    {when}
                  </Text>
                  {alert.lido && (
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 11, color: "#AAA", marginTop: 2 }}
                    >
                      Lido
                    </Text>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
