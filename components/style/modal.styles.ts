import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    maxHeight: "70%",
  },

  modalScroll: {
    marginTop: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#C68911",
    marginBottom: 18,
    textAlign: "center",
  },

  modalOption: {
    backgroundColor: "#FFF7E8",
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
    alignItems: "center",
  },

  modalOptionSelected: {
    backgroundColor: "#F2A31B",
  },

  modalOptionText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },

  modalOptionTextSelected: {
    color: "#FFF",
  },
});