// login.styles.ts

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
    marginBottom: 8,
  },

  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 28,
    paddingHorizontal: 10,
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
    fontSize: 13,
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
    fontSize: 13,
    height: "100%",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 22,
    gap: 12,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#BDBDBD",
  },

  dividerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#111",
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 34,
  },

  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#E89B17",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  loginButtonText: {
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
    fontSize: 15,
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