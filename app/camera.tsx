import React, { useEffect, useState } from "react";

import Header from "@/components/header/Header";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "@/styles/camera.styles";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";

import ConfigDeteccao from "@/components/modals/configdeteccao";

import AjudaModal from "@/components/modals/ajudaModal";

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

  const [configModalVisible, setConfigModalVisible] =
    useState(false);

  const [helpModalVisible, setHelpModalVisible] =
    useState(false);

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
        <Header title="Câmera" />

        {/* BOTÃO CONFIGURAR */}
        <PrimaryButton
          title="Configurar detecção de emoções"
          onPress={() => {
            setConfigModalVisible(true);
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

      {/* BOTÃO ? */}
      <TouchableOpacity
        onPress={() => setHelpModalVisible(true)}
        style={styles.helpButton}
      >
        <Text style={styles.helpButtonText}>
          ?
        </Text>
      </TouchableOpacity>

      {/* MODAL CONFIG */}
      <ConfigDeteccao
        visible={configModalVisible}
        onClose={() => setConfigModalVisible(false)}
        onSave={() => {
          setConfigModalVisible(false);
          console.log("Configuração salva");
        }}
      />

      {/* MODAL AJUDA */}
      <AjudaModal
        visible={helpModalVisible}
        onClose={() => setHelpModalVisible(false)}
      />
    </SafeAreaView>
  );
}