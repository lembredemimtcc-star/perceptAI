// components/header/Header.tsx

import React from "react";

import { View, Text } from "react-native";

import { router } from "expo-router";

import { SecondaryButton } from "@/components/buttons/SecondaryButton";

import { styles } from "@/styles/header.styles";

type Props = {
  title: string;
};

export default function Header({
  title,
}: Props) {
  return (
    <View style={styles.scrollContent}>
      <View style={styles.headerRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            {title}
          </Text>

          <View style={styles.headerLine} />
        </View>

        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Voltar"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
}