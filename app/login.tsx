<<<<<<< HEAD
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LoginButton } from "@/components/buttons/LoginButton";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/login.styles";
=======
import { styles } from "@/styles/login.styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity,View,} from "react-native";
import {useFonts, Poppins_400Regular,Poppins_600SemiBold,Poppins_700Bold,} from "@expo-google-fonts/poppins";
import { LoginButton } from "@/components/buttons/LoginButton";
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

<<<<<<< HEAD
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) return null;

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha e-mail e senha.");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error?.message ?? "Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  }

=======
  const [mostrarSenha, setMostrarSenha] = useState(false);

  if (!fontsLoaded) return null;

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Login</Text>

          <Text style={styles.description}>
<<<<<<< HEAD
            É muito bom ver você novamente! Aproveite ao máximo nossa página
            web, que preparamos especialmente para você.
=======
            É muito bom ver você novamente! Aproveite ao máximo
            nossa página web, que preparamos especialmente para
            você.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
<<<<<<< HEAD
              placeholder="Digite aqui seu E-mail"
              placeholderTextColor="#9A9A9A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
=======
              placeholder="Digite aqui seu Email ou seu Username"
              placeholderTextColor="#9A9A9A"
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite aqui sua Senha"
                placeholderTextColor="#9A9A9A"
                secureTextEntry={!mostrarSenha}
<<<<<<< HEAD
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons
                  name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
=======
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Ionicons
                  name={
                    mostrarSenha
                      ? "eye-outline"
                      : "eye-off-outline"
                  }
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
                  size={20}
                  color="#8A8A8A"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
<<<<<<< HEAD
            <Text style={styles.dividerText}>ou use sua conta</Text>
=======

            <Text style={styles.dividerText}>
              ou use sua conta
            </Text>

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
<<<<<<< HEAD
              <FontAwesome name="facebook" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 16 }} />
          ) : (
            <LoginButton title="Logar" onPress={handleLogin} />
          )}
=======
              <FontAwesome
                name="facebook"
                size={20}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome
                name="google"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <LoginButton
            title="Logar"
            onPress={() => router.replace("/(tabs)")}
          />
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
