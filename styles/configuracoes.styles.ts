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
    paddingBottom: 40,
  },

  headerContainer: {
    marginBottom: 25,
  },

  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },

  headerLine: {
    width: 150,
    height: 1.5,
    backgroundColor: "#000",
  },

  content: {
    marginTop: 20,
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
