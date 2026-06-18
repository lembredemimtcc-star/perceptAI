import { supabase } from "./supabaseClient";
import { UserProfile } from "../types/user";

/**
 * Cadastra um novo usuário no Supabase Auth e insere o perfil complementar na tabela 'users'.
 */
export async function signUp(
  email: string,
  password: string,
  nome: string,
  tipo: "cuidador" | "paciente"
): Promise<UserProfile> {
  // 1. Cadastra as credenciais no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nome, tipo },
    },
  });

  if (authError) {
    console.error("Erro no cadastro do Supabase Auth:", authError.message);
    throw authError;
  }

  const user = authData.user;
  if (!user) {
    throw new Error("Não foi possível criar o usuário no Supabase.");
  }

  if (!authData.session) {
    return {
      id: user.id,
      nome,
      email,
      tipo,
      created_at: new Date().toISOString(),
    } as UserProfile;
  }

  // 2. Cria o registro na tabela de dados complementares 'users'
  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .upsert([
      {
        id: user.id, // Vincula ao ID gerado pelo Auth do Supabase
        nome: nome,
        email: email,
        tipo: tipo,
      },
    ])
    .select()
    .single();

  if (profileError) {
    console.error("Erro ao criar perfil de usuário no Supabase:", profileError.message);
    throw profileError;
  }

  return profileData as UserProfile;
}

/**
 * Realiza o login do usuário com email e senha.
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: any; profile: UserProfile }> {
  // 1. Autentica o usuário com o Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    console.error("Erro ao realizar login no Supabase Auth:", authError.message);
    throw authError;
  }

  const user = authData.user;
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  // 2. Busca os dados do perfil complementar do banco de dados
  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Erro ao buscar perfil complementar:", profileError.message);
    throw profileError;
  }

  return {
    user,
    profile: profileData as UserProfile,
  };
}

/**
 * Desconecta o usuário atual (logout).
 */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
}

/**
 * Obtém a sessão do usuário atualmente logado e seu perfil complementar.
 */
export async function getCurrentUser(): Promise<{ user: any; profile: UserProfile | null } | null> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return null;
  }

  const user = session.user;

  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Erro ao carregar perfil complementar do usuário logado:", profileError.message);
    return { user, profile: null };
  }

  return {
    user,
    profile: profileData as UserProfile,
  };
}
