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

  /* FILTROS */
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },

  customSelect: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3DEC0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  customSelectText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
  },

  /* DATA */
  dateTitle: {
    fontSize: 18,
    color: "#000",
    marginBottom: 18,
    fontFamily: "Poppins_600SemiBold",
  },

  /* ITEM HISTÓRICO */
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  /* BOX EMOÇÃO */
  emotionBox: {
    flex: 1,
    backgroundColor: "#F3DEC0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
  },

  emotionText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins_400Regular",
  },

  /* BOX HORÁRIO */
  timeBox: {
    backgroundColor: "#F2A31B",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  timeText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
  },
});