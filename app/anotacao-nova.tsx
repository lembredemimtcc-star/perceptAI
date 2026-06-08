<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  Platform,
=======
// anotacao-nova.tsx

import React, { useState } from "react";

import {
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
<<<<<<< HEAD
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
=======
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { router } from "expo-router";

import { styles } from "@/styles/anotacaoNova.styles";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

export default function AnotacaoNova() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

<<<<<<< HEAD
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

=======
  if (!fontsLoaded) return null;

  function onChangeDate(event: any, selectedDate?: Date) {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  function salvarNota() {
    const novaNota = {
      id: String(Date.now()),
      titulo,
      texto,
      data: date.toLocaleDateString("pt-BR"),
    };

    router.replace({
      pathname: "/anotacao",
      params: {
        novaNota: JSON.stringify(novaNota),
      },
    });
  }

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>
<<<<<<< HEAD
              {isEditing ? "Editar Anotação" : "Nova Anotação"}
            </Text>
            <View style={styles.headerLine} />
          </View>
          <View style={styles.backButtonContainer}>
            <SecondaryButton title="Voltar" onPress={() => router.back()} />
=======
              Nova Anotação
            </Text>

            <View style={styles.headerLine} />
          </View>

          <View style={styles.backButtonContainer}>
            <SecondaryButton
              title="Voltar"
              onPress={() => router.back()}
            />
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
          </View>
        </View>

        {/* TÍTULO */}
<<<<<<< HEAD
        <Text style={styles.label}>Título</Text>
=======
        <Text style={styles.label}>
          Título
        </Text>

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        <TextInput
          style={styles.inputSmall}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título"
        />

        {/* DATA */}
<<<<<<< HEAD
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{date.toLocaleDateString("pt-BR")}</Text>
=======
        <Text style={styles.label}>
          Data
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>
            {date.toLocaleDateString("pt-BR")}
          </Text>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
<<<<<<< HEAD
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
=======
            display="calendar"
            design="material"
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            onChange={onChangeDate}
          />
        )}

<<<<<<< HEAD
        {/* CONTEÚDO */}
        <Text style={styles.label}>Conteúdo</Text>
=======
        {/* TEXTO */}
        <Text style={styles.label}>
          Conteúdo
        </Text>

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          multiline
          placeholder="Digite sua anotação..."
        />

<<<<<<< HEAD
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
=======
        {/* SALVAR */}
        <PrimaryButton
          title="Salvar anotação"
          onPress={salvarNota}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        />
      </ScrollView>
    </SafeAreaView>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
