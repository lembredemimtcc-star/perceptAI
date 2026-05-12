import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 44,
    marginBottom: 25,
  },

  headerContainer: {
    flex: 1,
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 180,
    height: 1.5,
    backgroundColor: "#000",
    marginTop: 2,
  },

  /* LABEL */
  label: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1E1E1E",
    marginTop: 20,
    marginBottom: 10,
  },

  /* INPUT */
  input: {
    width: "100%",
    height: 180,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlignVertical: "top",
    marginBottom: 25,
  },
  dateButton: {
  width: "100%",
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: "#DDD",
  borderRadius: 12,
  paddingHorizontal: 15,
  marginBottom: 20,
},

dateText: {
  fontSize: 16,
  fontFamily: "Poppins_400Regular",
  color: "#000",
},

inputSmall: {
  width: "100%",
  height: 50,
  borderWidth: 1,
  borderColor: "#DDD",
  borderRadius: 12,
  paddingHorizontal: 15,
  fontSize: 16,
  fontFamily: "Poppins_400Regular",
  marginBottom: 20,
},
});