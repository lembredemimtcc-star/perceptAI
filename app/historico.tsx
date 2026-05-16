// historico.tsx

import React from "react";

import Header from "@/components/header/Header";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { styles } from "@/styles/historico.styles";

export default function HistoricoScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          
          {/* HEADER */}
          <Header title="Histórico" />

          {/* DIA */}
          <Text style={styles.dateTitle}>
            Dia 7 de março de 2026
          </Text>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Dor
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                18:34
              </Text>
            </View>
          </View>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Sono
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                18:22
              </Text>
            </View>
          </View>

          {/* ITEM */}
          <View style={styles.historyItem}>
            <View style={styles.emotionBox}>
              <Text style={styles.emotionText}>
                Emoção: Sede
              </Text>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                17:30
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}