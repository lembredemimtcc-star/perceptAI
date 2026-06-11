import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/anotacaoNova.styles";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { useAuth } from "@/context/AuthContext";
import { fetchPatients, createPatient } from "@/services/api";
import { fetchAnnotation, saveAnnotation, updateAnnotation } from "@/services/annotations";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • patients    – to resolve patientId for new annotations (RLS: cuidador_id = auth.uid())
//   • annotations – INSERT (save) or UPDATE (edit)
// ─────────────────────────────────────────────────────────────────────

export default function AnotacaoNova() {
  const params = useLocalSearchParams<{
    annotationId?: string;
    patientId?: string;
  }>();

  // Support both string and string[] (expo-router quirk)
  const annotationId = Array.isArray(params.annotationId)
    ? params.annotationId[0]
    : params.annotationId;
  const patientIdParam = Array.isArray(params.patientId)
    ? params.patientId[0]
    : params.patientId;

  const isEditing = !!annotationId;

  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // ── Load existing annotation when editing ─────────────────────────

  useEffect(() => {
    if (!annotationId) return;

    const load = async () => {
      try {
        const annotation = await fetchAnnotation(annotationId);
        setTitulo(annotation.titulo);
        setTexto(annotation.texto);
        const rawDate = annotation.data_nota ?? annotation.created_at.slice(0, 10);
        setDate(new Date(`${rawDate}T00:00:00`));
      } catch (err: any) {
        setError(err?.message ?? "Falha ao carregar anotação.");
      }
    };

    load();
  }, [annotationId]);

  // ── Handlers ─────────────────────────────────────────────────────

  function onChangeDate(_event: any, selected?: Date) {
    setShowPicker(false);
    if (selected) setDate(selected);
  }

  async function salvarNota() {
    setError(null);

    if (!titulo.trim() || !texto.trim()) {
      setError("Título e conteúdo são obrigatórios.");
      return;
    }
    if (!isAuthenticated || !user) {
      setError("Usuário não autenticado.");
      return;
    }

    setIsSaving(true);

    try {
      const dataNota = date.toISOString().slice(0, 10);

      if (isEditing && annotationId) {
        // ── UPDATE existing annotation ─────────────────────────────
        await updateAnnotation(annotationId, titulo.trim(), texto.trim(), dataNota);
      } else {
        // ── CREATE new annotation ──────────────────────────────────
        // Resolve patientId: prefer the one passed as param, else fetch/create
        let resolvedPatientId = patientIdParam;

        if (!resolvedPatientId) {
          const patientsList = await fetchPatients(user.id);
          let patient = patientsList[0] ?? null;
          if (!patient) {
            patient = await createPatient("Paciente principal", user.id);
          }
          resolvedPatientId = patient.id;
        }

        await saveAnnotation(resolvedPatientId, titulo.trim(), texto.trim(), dataNota);
      }

      // Navigate back to the annotations tab and trigger a reload
      router.replace({
        pathname: "/(tabs)/anotacao",
        params: { reload: String(Date.now()) },
      });
    } catch (err: any) {
      console.error("Erro ao salvar anotação:", err);
      setError(err?.message ?? "Falha ao salvar anotação.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>
              {isEditing ? "Editar Anotação" : "Nova Anotação"}
            </Text>
            <View style={styles.headerLine} />
          </View>
          <View style={styles.backButtonContainer}>
            <SecondaryButton title="Voltar" onPress={() => router.back()} />
          </View>
        </View>

        {/* TÍTULO */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.inputSmall}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título"
        />

        {/* DATA */}
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{date.toLocaleDateString("pt-BR")}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={onChangeDate}
          />
        )}

        {/* CONTEÚDO */}
        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          multiline
          placeholder="Digite sua anotação..."
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* SALVAR */}
        <PrimaryButton
          title={
            isSaving
              ? "Salvando..."
              : isEditing
              ? "Atualizar anotação"
              : "Salvar anotação"
          }
          onPress={salvarNota}
          disabled={isSaving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
