import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

type SupabaseStorage = {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
};

function makeStorageAdapter(): SupabaseStorage {
  if (Platform.OS !== "web") {
    return AsyncStorage as unknown as SupabaseStorage;
  }

  if (typeof window !== "undefined" && window.localStorage) {
    return {
      getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
      setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
    };
  }

  const store: Record<string, string> = {};
  return {
    getItem: (key) => Promise.resolve(store[key] ?? null),
    setItem: (key, value) => { store[key] = value; return Promise.resolve(); },
    removeItem: (key) => { delete store[key]; return Promise.resolve(); },
  };
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: makeStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
