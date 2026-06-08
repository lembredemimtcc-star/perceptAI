export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  tipo: "cuidador" | "paciente";
<<<<<<< HEAD
  data_nascimento?: string | null;
  fonte_tamanho?: number | null;
  modo_claro?: boolean | null;
=======
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  created_at: string;
}

export interface Patient {
  id: string;
  nome: string;
  user_id?: string;
  cuidador_id: string;
  created_at: string;
}
