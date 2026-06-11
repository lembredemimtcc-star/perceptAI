import React, { useEffect, useState, useRef } from "react";

import Header from "@/components/header/Header";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { fetchPatients, createPatient, saveDetection } from "@/services/api";

export default function CameraScreen() {
  type CameraFacing = "front" | "back";

  const [facing, setFacing] =
    useState<CameraFacing>("front");

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

  const [emotion, setEmotion] = useState("Aguardando");
  const [time, setTime] = useState("--:--");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  const cameraRef = useRef<any>(null);
  const { user, isLoading } = useAuth();
        }
      } catch (err) {
        console.error("Erro ao inicializar paciente:", err);
      }
    };

    requestPermission();
    if (!isLoading) {
      initPatient();
    }
  }, [isLoading, requestPermission, user]);

  function toggleCameraFacing() {
    setFacing((current: CameraFacing) =>
      current === "back" ? "front" : "back"
    );
  }

  const detectarEmocao = async () => {
    if (!cameraRef.current) {
      alert("A câmera não está pronta.");
      return;
    }
    if (loading) return;

    try {
      setLoading(true);

      // 1. Captura a imagem em base64 com qualidade média para compressão ideal
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
        skipProcessing: true,
      });

      if (!photo || !photo.base64) {
        alert("Erro ao capturar a foto da câmera.");
        return;
      }

      // 2. Resolve a URL da API C# das variáveis de ambiente
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5246";
      const targetPatientId = patient ? patient.id : "00000000-0000-0000-0000-000000000000";

      // 3. Envia para a API C# (PerceptAI.API) rodando em C#
      const response = await fetch(`${apiUrl}/api/detection/detect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: photo.base64,
          patientId: targetPatientId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na inferência: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      // Resposta esperada: { emotion: string, confidence: number, timestamp: string }

      // 4. Formata o horário de recebimento da predição
      const predictionTime = new Date(result.timestamp);
      const formattedTime = predictionTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Capitaliza a primeira letra do nome da emoção para exibição
      const capitalizedEmotion = result.emotion.charAt(0).toUpperCase() + result.emotion.slice(1);

      setEmotion(capitalizedEmotion);
      setTime(formattedTime);
      setConfidence(result.confidence);

      // 5. Verifica o threshold local de confiança configurado no modal
      const savedThresholdStr = await AsyncStorage.getItem("@perceptai:threshold");
      const localThreshold = savedThresholdStr ? parseFloat(savedThresholdStr) / 100 : 0.75;

      // 6. Grava detecções críticas no Supabase (se atingir o threshold local e não for "neutro")
      if (result.confidence >= localThreshold && result.emotion.toLowerCase() !== "neutro") {
        await saveDetection(targetPatientId, result.emotion.toLowerCase(), result.confidence);
        console.log(`Detecção crítica '${result.emotion}' salva no Supabase (Confiança: ${(result.confidence * 100).toFixed(1)}%).`);
      } else {
        console.log(`Detecção '${result.emotion}' ignorada. Confiança: ${(result.confidence * 100).toFixed(1)}% | Limiar local: ${(localThreshold * 100).toFixed(1)}%`);
      }

    } catch (err: any) {
      console.error("Erro no processo de detecção:", err);
      alert(`Falha na detecção: ${err.message || "Verifique se a API C# está online e acessível."}`);
    } finally {
      setLoading(false);
    }
  };

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
          Câmera do paciente {patient ? `(${patient.nome})` : ""}
        </Text>

        {/* CÂMERA */}
        <View style={styles.cameraBox}>
          <CameraView
            ref={cameraRef}
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
              Emoção: {emotion} {confidence !== null ? `(${(confidence * 100).toFixed(0)}%)` : ""}
            </Text>

            <Text style={styles.timeText}>
              {time}
            </Text>
          </View>
        </View>

        {/* BOTÃO DETECTAR */}
        <View style={{ position: "relative" }}>
          <PrimaryButton
            title={loading ? "Processando inferência..." : "Detectar emoção de agora"}
            onPress={detectarEmocao}
            disabled={loading}
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color="#FFF"
              style={{ position: "absolute", right: 20, top: 15 }}
            />
          )}
        </View>
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
