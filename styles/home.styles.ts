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

  /* CALENDÁRIO */

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 18,
    gap: 12,
    zIndex: 999,
  },

  dropdownWrapper: {
    flex: 1,
    position: "relative",
  },

  customDropdown: {
    backgroundColor: "#EFEFEF",
    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D8D8D8",
  },

  dropdownText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#555",
    fontSize: 14,
  },

  dropdownArrow: {
    fontFamily: "Poppins_700Bold",
    color: "#777",
    fontSize: 12,
  },

  dropdownMenu: {
    position: "absolute",
    top: 52,

    width: "100%",
    maxHeight: 180,

    backgroundColor: "#FFF",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#E5E5E5",

    paddingVertical: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 5,

    zIndex: 9999,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  dropdownItemText: {
    fontFamily: "Poppins_400Regular",
    color: "#444",
    fontSize: 14,
  },

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