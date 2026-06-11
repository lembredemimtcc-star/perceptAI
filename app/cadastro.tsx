import { styles } from "@/styles/cadastro.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { LoginButton } from "@/components/buttons/LoginButton";
import { useAuth } from "@/context/AuthContext";

export default function CadastroScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) return null;

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

  async function handleCadastro() {
    if (!email.trim() || !nome.trim() || !password.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha nome, e-mail e senha.");
      return;
    }

    setIsLoading(true);
    try {
      // Default type is "cuidador"; adjust if your UI has a role picker
      await signUp(email.trim(), password, nome.trim(), "cuidador");
      Alert.alert(
        "Cadastro realizado!",
        "Verifique seu e-mail para confirmar a conta e depois faça login.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } catch (error: any) {
      Alert.alert("Erro no cadastro", error?.message ?? "Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

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
            {/* EMAIL */}
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Email"
              placeholderTextColor="#9A9A9A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
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

            {/* NOME */}
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Nome"
              placeholderTextColor="#9A9A9A"
              value={nome}
              onChangeText={setNome}
                  size={20}
                  color="#8A8A8A"
                />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 16 }} />
            ) : (
              <LoginButton title="Cadastrar" onPress={handleCadastro} />
            )}
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
