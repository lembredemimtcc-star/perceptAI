import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "Poppins_400Regular",
    marginBottom: 20,
    color: "#333",
  },

  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  dayButton: {
    backgroundColor: "#EAEAEA",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  dayButtonSelected: {
    backgroundColor: "#F2A31B",
  },

  dayButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },

  dayButtonTextSelected: {
    color: "#FFF",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#F2A31B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#333",
    fontFamily: "Poppins_600SemiBold",
  },

  saveButtonText: {
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
});

export default styles;