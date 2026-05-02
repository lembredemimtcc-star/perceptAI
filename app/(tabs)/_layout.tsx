import { CustomDrawer } from "@/components/navigation/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { styles } from "@/styles/layout.styles";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTransparent: false,
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            shadowOpacity: 0,
          },

          headerTitleAlign: "left",

          headerTitleContainerStyle: {
            marginLeft: -10,
          },

          drawerStyle: {
            backgroundColor: "transparent",
            width: "85%",
          },

          sceneContainerStyle: {
            backgroundColor: "transparent",
          },

          // 🔥 AQUI ESTÁ O EFEITO ESCURO
          overlayColor: "rgba(0,0,0,0.4)",

          drawerLabelStyle: {
            fontFamily: "Poppins_600SemiBold",
            fontSize: 15,
          },

          drawerActiveTintColor: "#F2A31B",
          drawerInactiveTintColor: "#333",

          headerTitle: ({ children }) => (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{children}</Text>
              <View style={styles.underline} />
            </View>
          ),

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.menuButton}
            >
              <Ionicons name="menu-outline" size={35} color="black" />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Início",
            headerTitle: "Início",
          }}
        />

        <Drawer.Screen
          name="anotacao"
          options={{
            drawerLabel: "Anotação",
            headerTitle: "Anotações",
          }}
        />

        <Drawer.Screen
          name="perfil"
          options={{
            drawerLabel: "Meu Perfil",
            headerTitle: "Perfil",
          }}
        />

        <Drawer.Screen
          name="configuracoes"
          options={{
            drawerLabel: "Configurações",
            headerTitle: "Configurações",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}