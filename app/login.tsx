import { styles } from "@/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>
            É muito bom ter você novamente! Aproveite ao máximo nossa página
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
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons
                  name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9A9A9A"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou use sua conta</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#111" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#111" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.loginButtonText}>Logar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsContainer}>
          {Array.from({ length: 18 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: `${index * 6}%`,
                  bottom: index % 3 === 0 ? 5 : index % 2 === 0 ? 22 : 12,
                  width: 7 + (index % 4),
                  height: 7 + (index % 4),
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
