import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
<<<<<<< HEAD
import { AuthProvider } from "@/context/AuthContext";
=======
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b

// Impede que a Splash Screen saia antes das fontes carregarem
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

<<<<<<< HEAD
=======
  // Se as fontes não carregarem e não houver erro ainda, não renderiza nada
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  if (!loaded && !error) {
    return null;
  }

  return (
<<<<<<< HEAD
    <AuthProvider>
=======
    <>
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="autenticacao" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark" />
<<<<<<< HEAD
    </AuthProvider>
  );
}
=======
    </>
  );
}
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
