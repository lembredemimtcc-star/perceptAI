import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuButton: {
    marginLeft: 20,
  },

  titleContainer: {
    alignItems: "flex-start",
    paddingBottom: 5,
  },

  titleText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#000",
  },

  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    marginTop: 2,
  },

  headerStyle: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
  },

  headerTitleContainerStyle: {
    marginLeft: -10,
  },

  drawerStyle: {
    backgroundColor: "transparent",
    width: "85%",
  },

  sceneContainerStyle: {
    backgroundColor: "transparent",
  },

  drawerLabelStyle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
});