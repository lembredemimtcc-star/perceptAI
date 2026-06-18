import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
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
import { styles } from "@/styles/anotacao.styles";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { fetchPatients, createPatient } from "@/services/api";
import { fetchAnnotations, deleteAnnotation } from "@/services/annotations";
import { Annotation } from "@/types/annotation";
import { Patient } from "@/types/user";
import ConfirmacaoModal from "@/components/modals/confirmacaoModal";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • patients  – to resolve which patient belongs to this cuidador
//   • annotations – CRUD on annotation records
// ─────────────────────────────────────────────────────────────────────

export default function AnotacaoScreen() {
  const [listaNotas, setListaNotas] = useState<Annotation[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useLocalSearchParams();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const { user, isLoading } = useAuth();

  // ── load ─────────────────────────────────────────────────────────

  const loadAnnotations = useCallback(async () => {
    if (!user?.id) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Resolve the patient linked to this cuidador
      const patientsList = await fetchPatients(user.id);
      let currentPatient = patientsList[0] ?? null;

      if (!currentPatient) {
        // First-time: create a default patient record
        currentPatient = await createPatient("Paciente principal", user.id);
      }

      setPatient(currentPatient);
      const annotations = await fetchAnnotations(currentPatient.id);
      setListaNotas(annotations);
    } catch (err: any) {
      console.error("Erro ao carregar anotações:", err);
      setError(err?.message ?? "Falha ao carregar anotações.");
      setListaNotas([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoading) loadAnnotations();
  }, [params.reload, isLoading, loadAnnotations]);

  // ── delete ───────────────────────────────────────────────────────
  // OBS: Alert.alert do React Native não funciona no ambiente Web
  // (não exibe diálogo nem dispara os callbacks dos botões), por isso
  // a confirmação usa o ConfirmacaoModal abaixo, que funciona em
  // Web e nativo da mesma forma.

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function confirmDelete(id: string) {
    setDeleteError(null);
    setDeleteTargetId(id);
  }

  async function handleConfirmDelete() {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setDeleteTargetId(null);
    try {
      await deleteAnnotation(id);
      setListaNotas((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      console.error("Erro ao deletar anotação:", err);
      setDeleteError(err?.message ?? "Não foi possível excluir a anotação.");
    }
  }

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Anotações</Text>
        <View style={styles.headerLine} />

        {/* ── BUTTONS ── */}
        <View style={styles.buttonsContainer}>
          {/* Refresh */}
          <TouchableOpacity style={styles.secondaryButton} onPress={loadAnnotations}>
            <Text style={styles.secondaryButtonText}>Atualizar</Text>
          </TouchableOpacity>

          {/* Add new */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              router.push({
                pathname: "/anotacao-nova",
                params: patient ? { patientId: patient.id } : {},
              })
            }
          >
            <Text style={styles.primaryButtonText}>Adicionar Anotação</Text>
          </TouchableOpacity>
        </View>

        {/* ── LIST ── */}
        {deleteError && <Text style={styles.emptyText}>{deleteError}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#F2A31B" style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={styles.emptyText}>{error}</Text>
        ) : (
          <FlatList
            data={listaNotas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>

                  <View style={styles.actions}>
                    {/* Edit — navigate to anotacao-nova in edit mode */}
                    <TouchableOpacity
                      style={styles.continueButton}
                      onPress={() =>
                        router.push({
                          pathname: "/anotacao-nova",
                          params: { annotationId: item.id },
                        })
                      }
                    >
                      <Text style={styles.continueText}>Editar</Text>
                    </TouchableOpacity>

                    {/* Delete */}
                    <TouchableOpacity
                      onPress={() => confirmDelete(item.id)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="trash-outline" size={18} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.descriptionBox}>
                  <Text style={styles.descriptionTitle}>Descrição:</Text>
                  <Text style={styles.descriptionText} numberOfLines={2}>
                    {item.texto}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Data: {item.data_nota ?? item.created_at.slice(0, 10)}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma nota anotada ainda.</Text>
            }
          />
        )}
      </View>

      {/* Confirmation before deleting an annotation */}
      <ConfirmacaoModal
        visible={deleteTargetId !== null}
        title="Excluir anotação"
        message="Deseja realmente excluir esta anotação?"
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}
