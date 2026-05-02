import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  headerContainer: {
    marginBottom: 25,
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 150,
    height: 1.5,
    backgroundColor: "#000",
    marginBottom: 10,
  },

  /* INPUTS */
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },

  /* DIVISOR */
  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
    opacity: 0.2,
  },

  /* LINHA PRINCIPAL (AJUSTADA) */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
    marginRight: 8,
  },

  /* TOGGLE */
  toggle: {
    width: 50,
    height: 26,
    backgroundColor: "#CCC",
    borderRadius: 20,
    justifyContent: "center",
    padding: 3,
    marginRight: 10,
  },

  toggleActive: {
    backgroundColor: "#F2A31B",
  },

  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },

  toggleCircleActive: {
    alignSelf: "flex-end",
  },

  /* FONTE */
  fontControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  fontButton: {
    width: 30,
    height: 30,
    backgroundColor: "#EDEDED",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },

  fontText: {
    fontFamily: "Poppins_600SemiBold",
  },

  /* BOTÕES */
  logoutButton: {
    backgroundColor: "#E0E0E0",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },

  deleteButton: {
    backgroundColor: "#FF3B30",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  deleteText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFF",
  },

  saveButton: {
    backgroundColor: "#F2A31B",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  saveText: {
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },
});