import { styles } from "@/styles/cadastro.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import {SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity,View,} from "react-native";
import {useFonts,Poppins_400Regular,Poppins_600SemiBold,Poppins_700Bold,} from "@expo-google-fonts/poppins";
import { LoginButton } from "@/components/buttons/LoginButton";
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

export default function CadastroScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

<<<<<<< HEAD
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [isLoading, setIsLoading] = useState(false);
=======
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [username, setUsername] = useState("");
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

  if (!fontsLoaded) return null;

  const formatarData = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
<<<<<<< HEAD
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
=======

    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
    if (cleaned.length > 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
<<<<<<< HEAD
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

=======

    return cleaned;
  };

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Cadastro</Text>

          <Text style={styles.description}>
<<<<<<< HEAD
            Cadastre-se e tenha acesso completo à plataforma. Tudo foi
            desenvolvido para oferecer a melhor experiência possível.
=======
            Cadastre-se e tenha acesso completo à plataforma.
            Tudo foi desenvolvido para oferecer a melhor
            experiência possível.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
          </Text>

          <View style={styles.form}>
            {/* EMAIL */}
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Email"
              placeholderTextColor="#9A9A9A"
<<<<<<< HEAD
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
=======
            />

            {/* USERNAME */}
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Username"
              placeholderTextColor="#9A9A9A"
              value={username}
              onChangeText={setUsername}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            />

            {/* DATA DE NASCIMENTO */}
            <TextInput
              style={styles.input}
              placeholder="Data de nascimento (DD/MM/AAAA)"
              placeholderTextColor="#9A9A9A"
              keyboardType="numeric"
              value={dataNascimento}
<<<<<<< HEAD
              onChangeText={(text) => setDataNascimento(formatarData(text))}
=======
              onChangeText={(text) =>
                setDataNascimento(formatarData(text))
              }
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
              maxLength={10}
            />

            {/* NOME */}
            <TextInput
              style={styles.input}
              placeholder="Digite aqui seu Nome"
              placeholderTextColor="#9A9A9A"
<<<<<<< HEAD
              value={nome}
              onChangeText={setNome}
=======
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            />

            {/* SENHA */}
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

<<<<<<< HEAD
            {isLoading ? (
              <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 16 }} />
            ) : (
              <LoginButton title="Cadastrar" onPress={handleCadastro} />
            )}
=======
            <LoginButton
              title="Cadastrar"
              onPress={() => router.replace("/login")}
            />
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
