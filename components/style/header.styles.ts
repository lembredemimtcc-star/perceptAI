// styles/header.styles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },

  buttonContainer: {
    width: 120,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 44,
    marginBottom: 25,
  },

  headerContainer: {
    flex: 1,
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 140,
    height: 1.5,
    backgroundColor: "#000",
    marginTop: 2,
  },

  /* BOTÃO VOLTAR */
  backButtonText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    marginTop: 4,
  },
});