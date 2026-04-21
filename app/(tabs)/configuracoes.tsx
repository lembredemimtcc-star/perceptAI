import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles/configuracoes.styles";

export default function ConfiguracoesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Configurações</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            As opções de ajustes e preferências aparecerão aqui.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
