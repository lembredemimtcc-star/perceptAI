import React, { useState } from "react";
import {SafeAreaView,ScrollView,Text,View,TouchableOpacity,TextInput,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useFonts,Poppins_400Regular,Poppins_600SemiBold,Poppins_700Bold,} from "@expo-google-fonts/poppins";
import { styles } from "@/styles/configuracoes.styles";

export default function ConfiguracoesScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Configurações</Text>
          <View style={styles.headerLine} />
        </View>

        {/* INPUT USERNAME */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
          <Ionicons name="pencil" size={18} color="#555" />
        </View>

        {/* INPUT EMAIL */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
          <Ionicons name="pencil" size={18} color="#555" />
        </View>

        {/* INPUT DATA DE NASCIMENTO */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            value={birth}
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#999"
            onChangeText={(text) => {
              let cleaned = text.replace(/\D/g, "");

              if (cleaned.length > 2) {
                cleaned = cleaned.replace(
                  /^(\d{2})(\d)/,
                  "$1/$2"
                );
              }

              if (cleaned.length > 5) {
                cleaned = cleaned.replace(
                  /^(\d{2})\/(\d{2})(\d)/,
                  "$1/$2/$3"
                );
              }

              setBirth(cleaned);
            }}
          />
          <Ionicons name="pencil" size={18} color="#555" />
        </View>

        <View style={styles.divider} />

        {/* LINHA: MODO + FONTE */}
        <View style={styles.row}>
          <Text style={styles.label}>Modo claro</Text>

          <TouchableOpacity
            style={[
              styles.toggle,
              isLightMode && styles.toggleActive,
            ]}
            onPress={() => setIsLightMode(!isLightMode)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.toggleCircle,
                isLightMode &&
                  styles.toggleCircleActive,
              ]}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Fonte</Text>

          <View style={styles.fontControls}>
            <TouchableOpacity style={styles.fontButton}>
              <Text style={styles.fontText}>A+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fontButton}>
              <Text style={styles.fontText}>A-</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* BOTÃO SAIR */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        {/* BOTÃO EXCLUIR */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>
            Excluir conta
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}