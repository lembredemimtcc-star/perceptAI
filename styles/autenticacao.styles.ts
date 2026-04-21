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

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },

  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E89B17",
    letterSpacing: 1,
  },

  textContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#C97D00",
    textAlign: "center",
    lineHeight: 28,
  },

  description: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
    paddingHorizontal: 8,
  },

  section: {
    alignItems: "center",
  },

  sectionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 14,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#E89B17",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 10,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#8D8D8D",
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6D6D6D",
  },

  secondaryButtonText: {
    color: "#111",
    fontSize: 18,
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
