import { styles } from "@/styles/autenticacao.styles";
import { router } from "expo-router";
import React from "react";
import {SafeAreaView,Text,View,} from "react-native";
import {Poppins_400Regular,Poppins_600SemiBold,Poppins_700Bold,useFonts,} from "@expo-google-fonts/poppins";
import { LoginButton } from "@/components/buttons/LoginButton";
import { RegisterButton } from "@/components/buttons/RegisterButton";

export default function AutenticacaoScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>perceptAI</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Bem-vindo ao nosso aplicativo
          </Text>

          <Text style={styles.description}>
            Mergulhe em um mundo repleto de conhecimento e
            funcionalidades para aprimorar sua memória.
          </Text>
        </View>

        <View style={styles.authContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Já tem conta?
            </Text>

            <LoginButton
              title="Logar"
              onPress={() => router.push("/login")}
            />
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <View style={styles.divider} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Não tem conta?
            </Text>

            <RegisterButton
              title="Cadastrar"
              onPress={() => router.push("/cadastro")}
            />
          </View>
        </View>

        <View style={styles.dotsContainer}>
          {Array.from({ length: 18 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: `${index * 6}%`,
                  bottom:
                    index % 3 === 0
                      ? 5
                      : index % 2 === 0
                      ? 22
                      : 12,
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