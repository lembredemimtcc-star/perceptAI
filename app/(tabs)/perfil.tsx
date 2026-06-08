import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { router } from "expo-router";
import { styles } from "@/styles/perfil.styles";
import { useAuth } from "@/context/AuthContext";

// ─────────────────────────────────────────────────────────────────────
// TABLE DEPENDENCIES
//   • users – read-only (via AuthContext.profile)
// ─────────────────────────────────────────────────────────────────────

type ProfileItemProps = { label: string; value: string };

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

/** Convert stored ISO date (YYYY-MM-DD) → DD/MM/YYYY for display. */
function formatBirth(iso?: string | null): string {
  if (!iso) return "Não informado";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "Não informado";
  return `${d}/${m}/${y}`;
}

export default function PerfilScreen() {
  // user  → Supabase Auth row (source of truth for email)
  // profile → 'users' table row (nome, tipo, data_nascimento, etc.)
  const { user, profile } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const displayName = profile?.nome ?? user?.email?.split("@")[0] ?? "Usuário";
  // Always use the Supabase Auth email (never a placeholder)
  const displayEmail = user?.email ?? profile?.email ?? "Sem email";
  const displayBirth = formatBirth(profile?.data_nascimento);
  const displayTipo = profile?.tipo === "paciente" ? "Paciente" : "Cuidador";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Perfil</Text>
          <View style={styles.headerLine} />
        </View>

        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera-outline" size={60} color="#E89B12" />
            </View>

            {/* Edit badge → settings page */}
            <TouchableOpacity
              style={styles.editBadge}
              activeOpacity={0.7}
              onPress={() => router.push("/(tabs)/configuracoes")}
            >
              <Ionicons name="pencil" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* INFO — all values from the 'users' table and Supabase Auth */}
        <View style={styles.infoSection}>
          <ProfileItem label="Username" value={displayName} />
          <ProfileItem label="E-mail" value={displayEmail} />
          <ProfileItem label="Data de Nascimento" value={displayBirth} />
          <ProfileItem label="Tipo de Conta" value={displayTipo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
