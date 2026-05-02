import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { styles } from "@/styles/anotacao.styles";

type Nota = {
  id: string;
  texto: string;
};

export default function AnotacaoScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [listaNotas, setListaNotas] = useState<Nota[]>([]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Anotações</Text>
        <View style={styles.headerLine} />

        {/* BOTÕES NOVOS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Anotações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Adicionar Anotação
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={listaNotas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.notaItem}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#F2A31B"
              />
              <Text style={styles.notaTexto}>{item.texto}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhuma nota anotada ainda.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}