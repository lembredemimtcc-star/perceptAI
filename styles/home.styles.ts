import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    marginTop: 10,
    paddingBottom: 20,
  },

  headerContainer: {
    marginBottom: 20,
  },

  welcomeText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
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
    marginBottom: 0,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#C68911",
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: "#333",
    lineHeight: 18,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  instructionBox: {
    backgroundColor: "#FDEBD0",
    padding: 12,
    borderRadius: 15,
    width: "100%",
    marginBottom: 15,
  },

  instructionText: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Poppins_400Regular", // corrigido
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  monthSelector: {
    backgroundColor: "#F2A31B",
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  monthText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  arrowButton: {
    backgroundColor: "#E0E0E0",
    padding: 4,
    borderRadius: 8,
    marginLeft: 10,
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
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold", // corrigido
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 0,
  },

  dayBox: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 8,
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

  dayLabel: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },

  bottomButtonContainer: {
    marginTop: -25,
    marginBottom: 20,
  },
});