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

export default function CadastroScreen() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
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

            <TextInput
              style={styles.input}
              placeholder="Digite username"
              placeholderTextColor="#9A9A9A"
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
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons
                  name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9A9A9A"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite novamente sua Senha"
                placeholderTextColor="#9A9A9A"
                secureTextEntry={!mostrarConfirmacao}
              />
              <TouchableOpacity
                onPress={() => setMostrarConfirmacao(!mostrarConfirmacao)}
              >
                <Ionicons
                  name={mostrarConfirmacao ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9A9A9A"
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Digite aqui sua Data de Nascimento"
              placeholderTextColor="#9A9A9A"
            />

            <TouchableOpacity
              style={styles.cadastroButton}
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.cadastroButtonText}>Cadastre</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
