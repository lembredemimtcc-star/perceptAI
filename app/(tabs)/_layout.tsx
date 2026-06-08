import { CustomDrawer } from "@/components/navigation/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
<<<<<<< HEAD
import type { ReactNode } from "react";
=======

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
<<<<<<< HEAD
=======

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
import { styles } from "@/styles/layout.styles";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
<<<<<<< HEAD
        drawerContent={(props: any) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }: any) => ({
          headerShown: true,
          headerTransparent: false,
          headerStyle: styles.headerStyle,
          headerTitleAlign: "left",
          headerTitleContainerStyle: styles.headerTitleContainerStyle,
          drawerStyle: styles.drawerStyle,
          sceneContainerStyle: styles.sceneContainerStyle,
          overlayColor: "rgba(0,0,0,0.4)",
          drawerLabelStyle: styles.drawerLabelStyle,
          drawerActiveTintColor: "#F2A31B",
          drawerInactiveTintColor: "#333",
          headerTitle: ({ children }: { children: ReactNode }) => (
=======
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTransparent: false,

          headerStyle: styles.headerStyle,

          headerTitleAlign: "left",

          headerTitleContainerStyle:
            styles.headerTitleContainerStyle,

          drawerStyle: styles.drawerStyle,

          sceneContainerStyle:
            styles.sceneContainerStyle,

          overlayColor: "rgba(0,0,0,0.4)",

          drawerLabelStyle: styles.drawerLabelStyle,

          drawerActiveTintColor: "#F2A31B",
          drawerInactiveTintColor: "#333",

          headerTitle: ({ children }) => (
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{children}</Text>
              <View style={styles.underline} />
            </View>
          ),
<<<<<<< HEAD
=======

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.menuButton}
            >
<<<<<<< HEAD
              <Ionicons name="menu-outline" size={35} color="black" />
=======
              <Ionicons
                name="menu-outline"
                size={35}
                color="black"
              />
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="index"
<<<<<<< HEAD
          options={{ drawerLabel: "Início", headerTitle: "Início" }}
        />
        <Drawer.Screen
          name="camera"
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="anotacao"
          options={{ drawerLabel: "Anotações", headerTitle: "Anotações" }}
        />
        {/* Alertas — new screen backed by the alerts table */}
        <Drawer.Screen
          name="alertas"
          options={{ drawerLabel: "Alertas", headerTitle: "Alertas" }}
        />
        <Drawer.Screen
          name="perfil"
          options={{ drawerLabel: "Meu Perfil", headerTitle: "Perfil" }}
        />
        <Drawer.Screen
          name="configuracoes"
          options={{ drawerLabel: "Configurações", headerTitle: "Configurações" }}
=======
          options={{
            drawerLabel: "Início",
            headerTitle: "Início",
          }}
        />

        <Drawer.Screen
          name="camera"
          options={{
            headerShown: false,
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
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        />
      </Drawer>
    </GestureHandlerRootView>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
