import { styles } from "@/styles/autenticacao.styles";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AutenticacaoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo-perceptai.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>perceptAI</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Bem-vindo ao nosso aplicativo</Text>
          <Text style={styles.description}>
            Mergulhe em um mundo repleto de conhecimento e funcionalidades para
            aprimorar sua memória.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Já tem conta?</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.primaryButtonText}>Logar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Não tem conta?</Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/cadastro")}
          >
            <Text style={styles.secondaryButtonText}>Cadastrar</Text>
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
