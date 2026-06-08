import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    marginBottom: 25,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  cancelButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  confirmButton: {
    backgroundColor: "#F2A31B",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  cancelButtonText: {
    color: "#333",
    fontFamily: "Poppins_600SemiBold",
  },

  confirmButtonText: {
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
});

export default styles;