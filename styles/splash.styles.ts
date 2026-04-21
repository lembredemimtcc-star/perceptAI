import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    marginBottom: 40,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E89B17",
    letterSpacing: 1,
  },

  fallingDot: {
    position: "absolute",
    top: 0,
    backgroundColor: "#E89B17",
  },

  bottomArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 110,
  },

  bottomDot: {
    position: "absolute",
    backgroundColor: "#E89B17",
  },
});
