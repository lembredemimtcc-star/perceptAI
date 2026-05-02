import { styles } from "@/styles/cadastro.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function CadastroScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");

  if (!fontsLoaded) return null;

  // FORMATAÇÃO AUTOMÁTICA DD/MM/AAAA
  const formatarData = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    if (cleaned.length > 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Cadastro</Text>

          <Text style={styles.description}>
            Cadastre-se e tenha acesso completo à plataforma. Tudo foi
            desenvolvido para oferecer a melhor experiência possível.
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Email"
              placeholderTextColor="#9A9A9A"
            />

            {/* DATA DE NASCIMENTO */}
            <TextInput
              style={styles.input}
              placeholder="Data de nascimento (DD/MM/AAAA)"
              placeholderTextColor="#9A9A9A"
              keyboardType="numeric"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(formatarData(text))}
              maxLength={10}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Nome"
              placeholderTextColor="#9A9A9A"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite aqui sua Senha"
                placeholderTextColor="#9A9A9A"
                secureTextEntry={!mostrarSenha}
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Ionicons
                  name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#8A8A8A"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cadastroButton}
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.cadastroButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.bottomDots}>
          {Array.from({ length: 35 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: `${(index * 3) % 100}%`,
                  bottom: Math.random() * 20,
                  width: 6 + Math.random() * 8,
                  height: 6 + Math.random() * 8,
                  borderRadius: 999,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}