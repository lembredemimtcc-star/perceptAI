import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

import { styles } from "@/styles/perfil.styles";

type ProfileItemProps = {
  icon: any;
  label: string;
  value: string;
};

function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <View style={styles.itemRow}>
      <Ionicons name={icon} size={22} color="#F2A31B" />

      <View style={styles.itemTextContainer}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function PerfilScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Editar Perfil</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={70} color="#F2A31B" />

            <TouchableOpacity style={styles.editBadge} activeOpacity={0.7}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Ana Clara</Text>
          <Text style={styles.userEmail}>ana@gmail.com</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.card}>
            <ProfileItem
              icon="person-outline"
              label="Nome Completo"
              value="Ana Clara da Silva"
            />

            <View style={styles.separator} />

            <ProfileItem
              icon="mail-outline"
              label="E-mail"
              value="ana@gmail.com"
            />

            <View style={styles.separator} />

            <ProfileItem
              icon="calendar-outline"
              label="Data de Nascimento"
              value="12/08/2005"
            />
          </View>

          <Text style={styles.sectionTitle}>Conta</Text>

          <View style={styles.card}>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.6}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#333"
              />

              <Text style={styles.actionText}>Alterar Senha</Text>

              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}