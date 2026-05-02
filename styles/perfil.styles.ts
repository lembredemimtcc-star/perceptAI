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
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 150,
    height: 1.5,
    backgroundColor: "#000",
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },

  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "#F2A31B",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },

  userName: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginTop: 15,
    color: "#333",
  },

  userEmail: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins_400Regular",
  },

  infoSection: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#C68911",
    marginBottom: 10,
    marginTop: 15,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  itemTextContainer: {
    marginLeft: 15,
  },

  itemLabel: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Poppins_400Regular",
  },

  itemValue: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins_600SemiBold",
  },

  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 5,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },

  actionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    fontFamily: "Poppins_400Regular",
  },
});