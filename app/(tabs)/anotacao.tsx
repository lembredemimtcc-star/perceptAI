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

  // recebe nova anotação
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
            <View style={styles.notaItem}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#F2A31B"
              />

              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.notaTitulo}>
                  {item.titulo}
                </Text>

                <Text style={styles.notaData}>
                  {item.data}
                </Text>

                {/* 🔥 TEXTO BEM RESUMIDO */}
                <Text
                  style={styles.notaTexto}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.texto}
                </Text>
              </View>

              {/* 🗑 DELETE */}
              <TouchableOpacity
                onPress={() => deletarNota(item.id)}
                style={styles.deleteButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#FF4D4D"
                />
              </TouchableOpacity>
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