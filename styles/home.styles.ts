import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 40,
  },

  headerContainer: {
    marginBottom: 20,
  },

  welcomeText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
  },

  headerLine: {
    width: 200,
    height: 1.5,
    backgroundColor: "#000",
  },

  section: {
    marginBottom: 25,
    alignItems: "center",
  },

  sectionNoMargin: {
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#C68911",
    marginBottom: 8,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  instructionBoxCustom: {
    width: "100%",
    backgroundColor: "#ffa60d46",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  instructionTextCustom: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },

  /* FILTROS */

  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  customSelect: {
    width: "48%",
    backgroundColor: "#FFF7E8",
    borderWidth: 1.5,
    borderColor: "#F2A31B",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  customSelectText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
  },

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

  /* CALENDÁRIO */

  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },

  weekDayText: {
    width: "13%",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },

  dayBox: {
    width: "12.3%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 3,
  },

  dayBoxEmpty: {
    backgroundColor: "transparent",
  },

  dayBoxInactive: {
    backgroundColor: "#D9D9D9",
  },

  dayBoxActive: {
    backgroundColor: "#F2A31B",
  },

  dayBoxSelected: {
    borderWidth: 1.5,
    borderColor: "#000",
  },

  dayLabel: {
    fontFamily: "Poppins_600SemiBold",
  },

  dayLabelActive: {
    color: "#FFF",
  },
});