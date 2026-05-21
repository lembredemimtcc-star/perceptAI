import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";

type Nota = {
  id: string;
  titulo: string;
  texto: string;
  data: string;
};

export default function AnotacaoScreen() {
  const [listaNotas, setListaNotas] = useState<Nota[]>([]);
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (params.novaNota) {
      const novaNota = JSON.parse(params.novaNota as string);
      setListaNotas((prev) => [novaNota, ...prev]);
    }
  }, [params.novaNota]);

  function deletarNota(id: string) {
    setListaNotas((prev) =>
      prev.filter((nota) => nota.id !== id)
    );
  }

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Anotações</Text>
        <View style={styles.headerLine} />

        {/* BOTÕES */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              Anotações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/anotacao-nova")}
          >
            <Text style={styles.primaryButtonText}>
              Adicionar Anotação
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={listaNotas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* HEADER */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  {item.titulo}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>
                      Continuar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deletarNota(item.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* DESCRIÇÃO */}
              <View style={styles.descriptionBox}>
                <Text style={styles.descriptionTitle}>
                  Descrição:
                </Text>

                <Text
                  style={styles.descriptionText}
                  numberOfLines={2}
                >
                  {item.texto}
                </Text>
              </View>
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