import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 34,
    color: "#C97D00",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 8,
  },

  form: {
    gap: 12,
  },

  input: {
    fontFamily: "Poppins_400Regular",
    width: "100%",
    height: 46,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingHorizontal: 14,
    color: "#111",
    fontSize: 14,
  },

  passwordContainer: {
    width: "100%",
    height: 46,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    fontFamily: "Poppins_400Regular",
    flex: 1,
    color: "#111",
    fontSize: 14,
    height: "100%",
  },

  cadastroButton: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#E89B17",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  cadastroButtonText: {
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
    fontSize: 16,
  },

  bottomDots: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
  },

  dot: {
    position: "absolute",
    backgroundColor: "#E89B17",
  },
});