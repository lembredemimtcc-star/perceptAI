// login.tsx

import { styles } from "@/styles/login.styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
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

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Login</Text>

          <Text style={styles.description}>
            É muito bom ver você novamente! Aproveite ao máximo nossa página
            web, que preparamos especialmente para você.
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Email"
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
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou use sua conta</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.loginButtonText}>Logar</Text>
          </TouchableOpacity>
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