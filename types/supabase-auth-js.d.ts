declare module "@supabase/auth-js" {
  export type Session = {
    access_token: string;
    refresh_token: string;
    expires_in?: number;
    expires_at?: number;
    token_type?: string;
    user: User;
  };

  export type User = {
    id: string;
    email?: string;
    [key: string]: unknown;
  };

  export type AuthChangeEvent = string;

  export type Subscription = {
    unsubscribe: () => void;
  };

  export type AuthResponse<T = unknown> = {
    data: T;
    error: Error | null;
  };

  export type GoTrueClientOptions = {
    url?: string;
    headers?: Record<string, string>;
    storageKey?: string;
    autoRefreshToken?: boolean;
    persistSession?: boolean;
    detectSessionInUrl?: boolean;
    storage?: {
      getItem: (key: string) => Promise<string | null> | string | null;
      setItem: (key: string, value: string) => Promise<void> | void;
      removeItem: (key: string) => Promise<void> | void;
    };
    [key: string]: unknown;
  };

  export class AuthClient {
    constructor(options?: GoTrueClientOptions);
    getSession(): Promise<AuthResponse<{ session: Session | null }>>;
    getUser(jwt?: string): Promise<AuthResponse<{ user: User | null }>>;
    signUp(credentials: {
      email: string;
      password: string;
      options?: { data?: Record<string, unknown> };
    }): Promise<AuthResponse<{ user: User | null; session: Session | null }>>;
    signInWithPassword(credentials: {
      email: string;
      password: string;
    }): Promise<AuthResponse<{ user: User | null; session: Session | null }>>;
    updateUser(attributes: {
      email?: string;
      password?: string;
      data?: Record<string, unknown>;
    }): Promise<AuthResponse<{ user: User | null }>>;
    signOut(): Promise<{ error: Error | null }>;
    onAuthStateChange(
      callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>
    ): { data: { subscription: Subscription } };
  }

  export default AuthClient;
}

declare module "@expo/vector-icons";
declare module "expo-camera";
