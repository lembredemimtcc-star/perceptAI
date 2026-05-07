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
    marginBottom: 25,
    alignItems: "flex-start",
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 110,
    height: 1.5,
    backgroundColor: "#000",
    marginTop: 4,
  },

  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 70,
  },

  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 7,
    borderColor: "#E89B12",
    backgroundColor: "transparent",
    position: "relative",
  },

  cameraIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  editBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#D88E0A",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  infoSection: {
    marginTop: 10,
    gap: 35,
  },

  itemContainer: {
    width: "100%",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  itemLabel: {
    fontSize: 16,
    color: "#9B9B9B",
    fontFamily: "Poppins_400Regular",
  },

  itemValue: {
    fontSize: 18,
    color: "#111",
    fontFamily: "Poppins_600SemiBold",
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#7A7A7A",
  },
});