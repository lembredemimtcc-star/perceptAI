export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  tipo: "cuidador" | "paciente";
  created_at: string;
}

export interface Patient {
  id: string;
  nome: string;
  user_id?: string;
  cuidador_id: string;
  created_at: string;
}
