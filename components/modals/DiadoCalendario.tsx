import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { styles } from "../style/diaCalendario.styles";
import { useAuth } from "@/context/AuthContext";
import { fetchPatients, createPatient } from "@/services/api";
import { fetchAnnotationsByDate } from "@/services/annotations";
import { Annotation } from "@/types/annotation";

type Props = {
  visible: boolean;
  /** JS month index (0-11) */
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number | null;
  onClose: () => void;
};

export function DiadoCalendario({
  visible,
  selectedMonth,
  selectedYear,
  selectedDay,
  onClose,
}: Props) {
  const { user } = useAuth();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible || selectedDay === null || !user?.id) return;

    const fetchDayAnnotations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ensure the cuidador has a patient record
        const patients = await fetchPatients(user.id);
        let patient = patients[0] ?? null;
        if (!patient) {
          patient = await createPatient("Paciente principal", user.id);
        }

        // Build ISO date string for this calendar day
        const mm = String(selectedMonth + 1).padStart(2, "0");
        const dd = String(selectedDay).padStart(2, "0");
        const dateStr = `${selectedYear}-${mm}-${dd}`;

        const results = await fetchAnnotationsByDate(patient.id, dateStr);
        setAnnotations(results);
      } catch (err: any) {
        console.error("Erro ao carregar anotações do dia:", err);
        setError("Não foi possível carregar as anotações.");
      } finally {
        setLoading(false);
      }
    };

    fetchDayAnnotations();
  }, [visible, selectedDay, selectedMonth, selectedYear, user?.id]);

  const formattedDate =
    selectedDay !== null
      ? `${String(selectedDay).padStart(2, "0")}/${String(selectedMonth + 1).padStart(2, "0")}/${selectedYear}`
      : "";

  function handleAddAnnotation() {
    onClose();
    router.push("/anotacao-nova");
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { maxHeight: "70%" }]}>
          <Text style={styles.title}>Dia {selectedDay}</Text>
          <Text style={[styles.message, { marginBottom: 12 }]}>{formattedDate}</Text>

          {loading ? (
            <ActivityIndicator color="#F2A31B" />
          ) : error ? (
            <Text style={{ color: "#E63946", marginBottom: 12 }}>{error}</Text>
          ) : annotations.length === 0 ? (
            <Text style={styles.message}>Sem anotações para este dia.</Text>
          ) : (
            <ScrollView style={{ width: "100%", maxHeight: 200 }}>
              {annotations.map((a) => (
                <View
                  key={a.id}
                  style={{
                    backgroundColor: "#F2F2F2",
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{ fontFamily: "Poppins_700Bold", fontSize: 14, color: "#000" }}
                  >
                    {a.titulo}
                  </Text>
                  <Text
                    style={{ fontFamily: "Poppins_400Regular", fontSize: 13, color: "#555" }}
                    numberOfLines={2}
                  >
                    {a.texto}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}

          <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
            <TouchableOpacity
              style={[styles.button, { flex: 1, backgroundColor: "#F2A31B" }]}
              onPress={handleAddAnnotation}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>+ Anotação</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { flex: 1, backgroundColor: "#E0E0E0" }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
