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
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginBottom: 16,
  },

  customSelect: {
    width: "40%",
    backgroundColor: "#f5ce85",
    borderWidth: 1,
    borderColor: "#f5ce85a6",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  customSelectText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
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

  // PASSADOS
  dayBoxPast: {
    backgroundColor: "#F5CE85",
  },

  // FUTUROS
  dayBoxFuture: {
    backgroundColor: "#EAEAEA",
  },

  // HOJE
  dayBoxToday: {
    backgroundColor: "#F2A31B",
  },

  dayBoxSelected: {
    borderWidth: 1.5,
    borderColor: "#000",
  },

  dayLabel: {
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },

  // TEXTO DOS FUTUROS
  dayLabelPast: {
    color: "#9B9B9B",
  },

  // TEXTO DO HOJE
  dayLabelToday: {
    color: "#FFF",
  },
});