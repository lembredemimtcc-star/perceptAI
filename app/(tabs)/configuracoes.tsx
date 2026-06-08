<<<<<<< HEAD
import React, { useEffect, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabaseClient";
import { updateUserProfile, deleteUserProfile } from "@/services/api";
import { styles } from "@/styles/configuracoes.styles";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • users – UPDATE (nome, data_nascimento, modo_claro, fonte_tamanho)
//             DELETE (excluir conta)
//   Supabase Auth – updateUser (email change)
// ─────────────────────────────────────────────────────────────────────

// ── date helpers ──────────────────────────────────────────────────────

function isoToDisplay(iso?: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}/${m}/${y}`;
}

function displayToIso(display: string): string | null {
  if (!display.trim()) return null;
  const parts = display.split("/");
  if (parts.length !== 3 || parts[2].length !== 4) {
    throw new Error("Data inválida. Use o formato dd/mm/aaaa.");
  }
  const [d, m, y] = parts;
  return `${y}-${m}-${d}`;
}

function formatBirthInput(text: string): string {
  let cleaned = text.replace(/\D/g, "").slice(0, 8);
  if (cleaned.length > 4) {
    cleaned = cleaned.replace(/^(\d{2})(\d{2})(\d)/, "$1/$2/$3");
  } else if (cleaned.length > 2) {
    cleaned = cleaned.replace(/^(\d{2})(\d)/, "$1/$2");
  }
  return cleaned;
}

// ─────────────────────────────────────────────────────────────────────

export default function ConfiguracoesScreen() {
  const { user, profile, signOut, refreshProfile } = useAuth();

=======
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { router } from "expo-router";

import { styles } from "@/styles/configuracoes.styles";

export default function ConfiguracoesScreen() {
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

<<<<<<< HEAD
  // ── form state (pre-populated from profile) ───────────────────────
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setUsername(profile?.nome ?? "");
    // Email source of truth is Supabase Auth; fall back to profile row
    setEmail(profile?.email ?? user?.email ?? "");
    setBirth(isoToDisplay(profile?.data_nascimento));
    setIsLightMode(profile?.modo_claro ?? true);
    setFontSize(profile?.fonte_tamanho ?? 16);
  }, [profile, user]);

  // ── handlers ─────────────────────────────────────────────────────

  async function handleSave() {
    if (!user) {
      Alert.alert("Sessão expirada", "Entre novamente para salvar.");
      return;
    }
    if (!username.trim()) {
      Alert.alert("Campo obrigatório", "O nome não pode estar vazio.");
      return;
    }

    setIsSaving(true);
    try {
      const nextEmail = email.trim();

      // 1. Update Auth email if changed (sends confirmation email)
      if (nextEmail && nextEmail !== user.email) {
        const { error: authErr } = await supabase.auth.updateUser({ email: nextEmail });
        if (authErr) throw authErr;
      }

      // 2. Update 'users' table row
      let isoDate: string | null = null;
      try {
        isoDate = displayToIso(birth);
      } catch (e: any) {
        Alert.alert("Data inválida", e.message);
        setIsSaving(false);
        return;
      }

      await updateUserProfile(user.id, {
        nome: username.trim(),
        data_nascimento: isoDate,
        modo_claro: isLightMode,
        fonte_tamanho: fontSize,
      });

      await refreshProfile();

      Alert.alert(
        "Configurações salvas",
        nextEmail !== user.email
          ? "Confirme a mudança de e-mail pelo link enviado para o novo endereço."
          : "Suas informações foram atualizadas."
      );
    } catch (err: any) {
      console.error("Erro ao salvar configurações:", err);
      Alert.alert("Erro ao salvar", err?.message ?? "Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      router.replace("/autenticacao");
    } catch (err: any) {
      Alert.alert("Erro ao sair", err?.message ?? "Tente novamente.");
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;

    Alert.alert(
      "Excluir conta",
      "Isso apaga seu perfil, pacientes, anotações e histórico permanentemente. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              // Delete the 'users' row — cascade handles patients/annotations/detections/alerts
              await deleteUserProfile(user.id);
              await signOut();
              router.replace("/autenticacao");
            } catch (err: any) {
              console.error("Erro ao excluir conta:", err);
              Alert.alert("Erro ao excluir", err?.message ?? "Tente novamente.");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  }
=======
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [birth, setBirth] = useState("");

  const [isLightMode, setIsLightMode] =
    useState(true);
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Configurações</Text>
          <View style={styles.headerLine} />
        </View>

        {/* USERNAME */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
=======
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            Configurações
          </Text>

          <View style={styles.headerLine} />
        </View>

        {/* INPUT USERNAME */}

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
<<<<<<< HEAD
          <Ionicons name="pencil" size={18} color="#555" />
        </View>

        {/* EMAIL */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Ionicons name="pencil" size={18} color="#555" />
        </View>

        {/* DATA DE NASCIMENTO */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/aaaa"
=======

          <Ionicons
            name="pencil"
            size={18}
            color="#555"
          />
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

          <Ionicons
            name="pencil"
            size={18}
            color="#555"
          />
        </View>

        {/* INPUT DATA DE NASCIMENTO */}

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            value={birth}
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#999"
<<<<<<< HEAD
            onChangeText={(t) => setBirth(formatBirthInput(t))}
          />
          <Ionicons name="pencil" size={18} color="#555" />
=======
            onChangeText={(text) => {
              let cleaned = text.replace(
                /\D/g,
                ""
              );

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

          <Ionicons
            name="pencil"
            size={18}
            color="#555"
          />
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        </View>

        <View style={styles.divider} />

<<<<<<< HEAD
        {/* MODO CLARO + TAMANHO DA FONTE */}
        <View style={styles.row}>
          <Text style={styles.label}>Modo claro</Text>

          <TouchableOpacity
            style={[styles.toggle, isLightMode && styles.toggleActive]}
            onPress={() => setIsLightMode((v) => !v)}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleCircle, isLightMode && styles.toggleCircleActive]} />
          </TouchableOpacity>

          <Text style={styles.label}>Fonte</Text>
=======
        {/* LINHA: MODO + FONTE */}

        <View style={styles.row}>
          <Text style={styles.label}>
            Modo claro
          </Text>

          <TouchableOpacity
            style={[
              styles.toggle,
              isLightMode &&
                styles.toggleActive,
            ]}
            onPress={() =>
              setIsLightMode(
                !isLightMode
              )
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.toggleCircle,
                isLightMode &&
                  styles
                    .toggleCircleActive,
              ]}
            />
          </TouchableOpacity>

          <Text style={styles.label}>
            Fonte
          </Text>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

          <View style={styles.fontControls}>
            <TouchableOpacity
              style={styles.fontButton}
<<<<<<< HEAD
              onPress={() => setFontSize((v) => Math.min(v + 1, 24))}
            >
              <Text style={[styles.fontText, { fontSize }]}>A+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fontButton}
              onPress={() => setFontSize((v) => Math.max(v - 1, 12))}
            >
              <Text style={[styles.fontText, { fontSize }]}>A-</Text>
=======
            >
              <Text style={styles.fontText}>
                A+
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fontButton}
            >
              <Text style={styles.fontText}>
                A-
              </Text>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

<<<<<<< HEAD
        {/* SAIR */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        {/* EXCLUIR */}
        <TouchableOpacity
          style={[styles.deleteButton, isDeleting && { opacity: 0.6 }]}
          onPress={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.deleteText}>Excluir conta</Text>
          )}
        </TouchableOpacity>

        {/* SALVAR */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.saveText}>Salvar</Text>
          )}
=======
        {/* BOTÃO SAIR */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>
            router.push("/autenticacao")
          }
        >
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        {/* BOTÃO EXCLUIR */}

        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>
            Excluir conta
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SALVAR */}

        <TouchableOpacity
          style={styles.saveButton}
        >
          <Text style={styles.saveText}>
            Salvar
          </Text>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
