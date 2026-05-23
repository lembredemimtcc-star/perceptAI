import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "82%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Poppins_700Bold",
    marginBottom: 14,
    textAlign: "center",
  },

  message: {
    fontSize: 15,
    color: "#333",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#F2A31B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
});