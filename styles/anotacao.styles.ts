import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 150,
    height: 1.5,
    backgroundColor: "#000",
    marginBottom: 25,
  },

  /* BOTÕES */
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#ffeac5",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#F2A31B",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    fontSize: 14,
  },

  primaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    fontSize: 14,
  },

  /* 🔥 NOVO CARD */
  card: {
    backgroundColor: "#F2F2F2",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  continueButton: {
    backgroundColor: "#F2D3A2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  continueText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },

  deleteButton: {
    backgroundColor: "#F2D3A2",
    padding: 6,
    borderRadius: 8,
  },

  /* DESCRIÇÃO */
  descriptionBox: {
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },

  descriptionTitle: {
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    marginBottom: 4,
  },

  descriptionText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#333",
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});