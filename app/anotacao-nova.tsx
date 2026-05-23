// anotacao-nova.tsx

import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
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

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>
              Nova Anotação
            </Text>

            <View style={styles.headerLine} />
          </View>

          <View style={styles.backButtonContainer}>
            <SecondaryButton
              title="Voltar"
              onPress={() => router.back()}
            />
          </View>
        </View>

        {/* TÍTULO */}
        <Text style={styles.label}>
          Título
        </Text>

        <TextInput
          style={styles.inputSmall}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título"
        />

        {/* DATA */}
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
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            design="material"
            onChange={onChangeDate}
          />
        )}

        {/* TEXTO */}
        <Text style={styles.label}>
          Conteúdo
        </Text>

        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          multiline
          placeholder="Digite sua anotação..."
        />

        {/* SALVAR */}
        <PrimaryButton
          title="Salvar anotação"
          onPress={salvarNota}
        />
      </ScrollView>
    </SafeAreaView>
  );
}