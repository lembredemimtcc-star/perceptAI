import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 24,
    marginVertical: 40,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: "space-between",
    overflow: "hidden",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#C97D00",
    textAlign: "center",
    marginBottom: 14,
  },

  description: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 30,
    paddingHorizontal: 8,
  },

  form: {
    gap: 12,
  },

  input: {
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
    flex: 1,
    color: "#111",
    fontSize: 14,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#8D8D8D",
  },

  dividerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },

  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    width: "100%",
    backgroundColor: "#E89B17",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  dotsContainer: {
    position: "relative",
    height: 50,
    marginTop: 10,
  },

  dot: {
    position: "absolute",
    backgroundColor: "#E89B17",
  },
});
