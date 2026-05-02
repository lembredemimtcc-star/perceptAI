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
    backgroundColor: "#E6D3B3",
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

  notaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F0",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#F2A31B",
    elevation: 1,
  },

  notaTexto: {
    fontSize: 16,
    color: "#444",
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});