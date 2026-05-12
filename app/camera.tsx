import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { router } from "expo-router";

import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "@/styles/camera.styles";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

export default function CameraScreen() {
  const [facing, setFacing] =
    useState<CameraType>("front");

  const [permission, requestPermission] =
    useCameraPermissions();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    requestPermission();
  }, []);

  function toggleCameraFacing() {
    setFacing((current) =>
      current === "back" ? "front" : "back"
    );
  }

  if (!fontsLoaded) return null;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Permissão da câmera necessária.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>
              Câmera
            </Text>

            <View style={styles.headerLine} />
          </View>

          <View style={{ width: 120 }}>
            <SecondaryButton
              title="Voltar"
              onPress={() => router.back()}
            />
          </View>
        </View>

        {/* BOTÃO CONFIGURAR */}
        <PrimaryButton
          title="Configurar detecção de emoções"
          onPress={() => {
            console.log("Ir para configurações");
          }}
        />

        {/* TEXTO */}
        <Text style={styles.cameraLabel}>
          Câmera do paciente
        </Text>

        {/* CÂMERA */}
        <View style={styles.cameraBox}>
          <CameraView
            style={styles.camera}
            facing={facing}
          />

          {/* BOTÃO TROCAR CÂMERA */}
          <TouchableOpacity
            style={styles.switchButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons
              name="camera-reverse-outline"
              size={28}
              color="#FFF"
            />
          </TouchableOpacity>

          {/* BOX EMOÇÃO */}
          <View style={styles.emotionBox}>
            <Text style={styles.emotionText}>
              Emoção: Sono
            </Text>

            <Text style={styles.timeText}>
              18:22
            </Text>
          </View>
        </View>

        {/* BOTÃO DETECTAR */}
        <PrimaryButton
          title="Detectar emoção de agora"
          onPress={() => {
            console.log("Detectar emoção");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}