import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "@/styles/anotacao.styles";

type Nota = {
  id: string;
  texto: string;
};

export default function AnotacaoScreen() {
  const [nota, setNota] = useState("");
  const [listaNotas, setListaNotas] = useState<Nota[]>([]);

  const adicionarNota = () => {
    if (nota.trim().length > 0) {
      setListaNotas([
        ...listaNotas,
        { id: Math.random().toString(), texto: nota },
      ]);
      setNota("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Anotações</Text>
        <View style={styles.headerLine} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva uma nova nota..."
            value={nota}
            onChangeText={setNota}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={adicionarNota}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={30} color="white" />
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
            <Text style={styles.emptyText}>Nenhuma nota anotada ainda.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
