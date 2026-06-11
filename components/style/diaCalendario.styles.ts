import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "88%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 4,
    color: "#000",
  },

  message: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#555",
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#F2A31B",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
