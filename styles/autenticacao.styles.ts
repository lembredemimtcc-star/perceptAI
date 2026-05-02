import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "center",
    overflow: "hidden",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#E89B17",
    letterSpacing: 1,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#C97D00",
    textAlign: "center",
    lineHeight: 30,
  },

  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  authContainer: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },

  section: {
    width: "100%",
    alignItems: "center",
  },

  sectionText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#222",
    marginBottom: 8,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#E89B17",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
    fontSize: 18,
  },

  dividerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginVertical: 15,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D1D1",
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D1D1",
  },

  secondaryButtonText: {
    fontFamily: "Poppins_700Bold",
    color: "#111",
    fontSize: 18,
  },

  dotsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },

  dot: {
    position: "absolute",
    backgroundColor: "#E89B17",
  },
});