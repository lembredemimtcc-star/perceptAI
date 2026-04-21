import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    marginTop: 10,
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
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#333",
  },

  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#F2A31B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  notaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F0",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#F2A31B",
    elevation: 1,
  },

  notaTexto: {
    fontSize: 16,
    color: "#444",
    marginLeft: 10,
    fontWeight: "500",
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 14,
  },
});
