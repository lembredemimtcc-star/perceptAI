import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {SafeAreaView,ScrollView,Text,TouchableOpacity,View,} from "react-native";
import {useFonts,Poppins_400Regular,Poppins_600SemiBold,Poppins_700Bold,} from "@expo-google-fonts/poppins";
import { styles } from "@/styles/perfil.styles";

type ProfileItemProps = {
  label: string;
  value: string;
};

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
          <Text style={styles.titleText}>Perfil</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <View style={styles.cameraIconContainer}>
              <Ionicons
                name="camera-outline"
                size={60}
                color="#E89B12"
              />
            </View>

            <TouchableOpacity
              style={styles.editBadge}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <ProfileItem label="Username" value="Anaclara123" />

          <ProfileItem label="Email" value="Ana@gmail.com" />

          <ProfileItem
            label="Data de Nascimento"
            value="01/01/2001"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}