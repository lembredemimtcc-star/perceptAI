import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    
    paddingBottom: 30,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // marginTop: 0,
    marginBottom: 25,
  },

  headerContainer: {
    flex: 1,
  },

  titleText: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },

  headerLine: {
    width: 140,
    height: 1.5,
    backgroundColor: "#000",
    // marginTop: 2,
  },

  /* BOTÃO VOLTAR */
  backButtonText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    // marginTop: 4,
  },

  /* BOTÃO CONFIG */
  configButton: {
    backgroundColor: "#F2A31B",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 35,
  },

  configButtonText: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },

  /* TEXTO */
  cameraLabel: {
    fontSize: 20,
    color: "#1E1E1E",
    fontFamily: "Poppins_600SemiBold",
    marginTop: 30,
    marginBottom: 1,
  },

  /* ÁREA DA CÂMERA */
  cameraBox: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    position: "relative",
  },

  /* CÂMERA REDONDA */
  camera: {
    width: 360,
    height: 360,
    borderRadius: 180,
    overflow: "hidden",
  },

  /* BOTÃO TROCAR CÂMERA */
  switchButton: {
    position: "absolute",
    top: 25,
    right: 25,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },

  /* BOX EMOÇÃO */
  emotionBox: {
    position: "absolute",
    bottom: 30,
    width: "86%",
    backgroundColor: "#CFF2CC",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },

  emotionText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Poppins_400Regular",
  },

  timeText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
  },

  /* BOTÃO DETECTAR */
  detectButton: {
    backgroundColor: "#F2A31B",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  detectButtonText: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
});