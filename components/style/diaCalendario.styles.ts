import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },

  message: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#F2A31B",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
});