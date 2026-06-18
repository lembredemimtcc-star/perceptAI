import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
<<<<<<< HEAD
import { Platform } from "react-native";
=======
>>>>>>> 50c73db75805fa291aade0fa75df626656870758

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────────────
// Storage adapter
// ─────────────────────────────────────────────────────────────────────
// No Web, o Expo Router primeiro executa o bundle em Node (SSR) antes
// de chegar ao navegador. Nesse momento `window`/`localStorage` ainda
// não existem, e o AsyncStorage nativo (@react-native-async-storage)
// quebra com "ReferenceError: window is not defined".
//
// Para evitar isso, usamos:
//   - Web: um adapter que só acessa `window.localStorage` quando ele
//     realmente existe (ou seja, depois da hidratação no navegador).
//   - iOS/Android: o AsyncStorage nativo normalmente, sem alterações.
const ExpoWebStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return Promise.resolve(null);
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return Promise.resolve();
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return Promise.resolve();
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const supabaseStorage = Platform.OS === "web" ? ExpoWebStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
=======
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
>>>>>>> 50c73db75805fa291aade0fa75df626656870758
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
