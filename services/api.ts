<<<<<<< HEAD
import { supabase } from "./supabaseClient";
import { Detection, Alert } from "../types/emotion";
import { Patient, UserProfile } from "../types/user";

// ═══════════════════════════════════════════════════════════════════
// TABLE: detections
// Written by the C# backend (DetectionController) and read here
// for the historico screen. RLS: cuidador sees only rows where
// patients.cuidador_id = auth.uid()
// ═══════════════════════════════════════════════════════════════════

/**
 * Save a detection result for a patient.
 * Also auto-creates an alert row for the cuidador.
=======
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Detection, Alert } from "../types/emotion";
import { Patient, UserProfile } from "../types/user";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// Inicializa o cliente do Supabase com AsyncStorage para persistência de sessão em React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// =====================================================================
// CAMADA DE CHAMADAS DE BANCO DE DADOS (API)
// =====================================================================

/**
 * Salva uma nova detecção de emoção no banco de dados.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
 */
export async function saveDetection(
  patientId: string,
  tipoEmocao: string,
  confianca: number
): Promise<Detection | null> {
  const { data, error } = await supabase
    .from("detections")
    .insert([
      {
        patient_id: patientId,
        tipo_emocao: tipoEmocao,
<<<<<<< HEAD
        confianca,
=======
        confianca: confianca,
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
        timestamp: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
<<<<<<< HEAD
    console.error("Erro ao salvar detecção:", error.message);
    throw error;
  }

  // Auto-create alert for the responsible cuidador
  try {
    const { data: patient } = await supabase
=======
    console.error("Erro ao salvar detecção no Supabase:", error.message);
    throw error;
  }

  // Se for uma emoção de alerta crítico (medo, enjoo, dor, sono, tristeza), 
  // dispara um alerta automaticamente para o cuidador do paciente
  try {
    // 1. Busca quem é o cuidador responsável por este paciente
    const { data: patient, error: patientErr } = await supabase
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      .from("patients")
      .select("cuidador_id")
      .eq("id", patientId)
      .single();

<<<<<<< HEAD
    if (patient?.cuidador_id) {
=======
    if (patient && !patientErr) {
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
      await createAlert(data.id, patient.cuidador_id);
    }
  } catch (err) {
    console.error("Erro ao gerar alerta automático:", err);
  }

  return data as Detection;
}

/**
<<<<<<< HEAD
 * Fetch detection history.
 * When patientId is omitted the RLS policy returns only detections
 * for patients that belong to the authenticated cuidador.
 */
export async function fetchDetections(patientId?: string): Promise<Detection[]> {
=======
 * Busca o histórico de detecções de um paciente específico (ou todas).
 */
export async function fetchDetections(
  patientId?: string
): Promise<Detection[]> {
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
  let query = supabase
    .from("detections")
    .select("*")
    .order("timestamp", { ascending: false });

  if (patientId) {
    query = query.eq("patient_id", patientId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar detecções:", error.message);
    throw error;
  }

<<<<<<< HEAD
  return (data ?? []) as Detection[];
}

// ═══════════════════════════════════════════════════════════════════
// TABLE: patients
// RLS: INSERT requires cuidador_id = auth.uid()
//       SELECT returns rows where cuidador_id = auth.uid()
// ═══════════════════════════════════════════════════════════════════

/**
 * Create a patient record linked to the currently authenticated cuidador.
 * cuidadorId MUST equal auth.uid() — enforced by Supabase RLS.
 */
export async function createPatient(
  nome: string,
  cuidadorId: string
): Promise<Patient> {
  const { data, error } = await supabase
    .from("patients")
    .insert([{ nome, cuidador_id: cuidadorId }])
=======
  return data as Detection[];
}

/**
 * Cadastra um novo paciente para um cuidador.
 */
export async function createPatient(
  nome: string,
  cuidadorId: string,
  userId?: string
): Promise<Patient> {
  const { data, error } = await supabase
    .from("patients")
    .insert([
      {
        nome,
        cuidador_id: cuidadorId,
        user_id: userId || null,
      },
    ])
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
    .select()
    .single();

  if (error) {
    console.error("Erro ao cadastrar paciente:", error.message);
    throw error;
  }

  return data as Patient;
}

/**
<<<<<<< HEAD
 * Fetch all patients belonging to the given cuidador.
 * The cuidadorId argument is used for the .eq() filter; RLS enforces
 * that auth.uid() must match cuidador_id as a second layer.
=======
 * Busca todos os pacientes sob os cuidados de um cuidador específico.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
 */
export async function fetchPatients(cuidadorId: string): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("cuidador_id", cuidadorId)
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao buscar pacientes:", error.message);
    throw error;
  }

<<<<<<< HEAD
  return (data ?? []) as Patient[];
}

/**
 * Update a patient's name.
 */
export async function updatePatient(
  patientId: string,
  nome: string
): Promise<Patient> {
  const { data, error } = await supabase
    .from("patients")
    .update({ nome })
    .eq("id", patientId)
=======
  return data as Patient[];
}

/**
 * Salva uma nova anotação sobre um paciente.
 */
export async function saveAnnotation(
  patientId: string,
  texto: string
): Promise<any> {
  const { data, error } = await supabase
    .from("annotations")
    .insert([{ patient_id: patientId, texto }])
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
    .select()
    .single();

  if (error) {
<<<<<<< HEAD
    console.error("Erro ao atualizar paciente:", error.message);
    throw error;
  }

  return data as Patient;
}

/**
 * Delete a patient and cascade-delete their detections, annotations, alerts.
 */
export async function deletePatient(patientId: string): Promise<void> {
  const { error } = await supabase.from("patients").delete().eq("id", patientId);

  if (error) {
    console.error("Erro ao deletar paciente:", error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════
// TABLE: alerts
// RLS: cuidador_id = auth.uid() on all operations
// ═══════════════════════════════════════════════════════════════════

/**
 * Create an alert for a cuidador linked to a detection.
=======
    console.error("Erro ao salvar anotação:", error.message);
    throw error;
  }

  return data;
}

/**
 * Busca as anotações sobre um paciente.
 */
export async function fetchAnnotations(patientId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from("annotations")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar anotações:", error.message);
    throw error;
  }

  return data;
}

/**
 * Cria um novo alerta para o cuidador.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
 */
export async function createAlert(
  detectionId: string,
  cuidadorId: string
): Promise<Alert> {
  const { data, error } = await supabase
    .from("alerts")
    .insert([{ detection_id: detectionId, cuidador_id: cuidadorId, lido: false }])
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar alerta:", error.message);
    throw error;
  }

  return data as Alert;
}

/**
<<<<<<< HEAD
 * Fetch unread (lido=false) alerts for a cuidador, joined with detection data.
=======
 * Busca alertas não lidos de um cuidador.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
 */
export async function fetchUnreadAlerts(cuidadorId: string): Promise<Alert[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*, detection:detections(*)")
    .eq("cuidador_id", cuidadorId)
    .eq("lido", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar alertas não lidos:", error.message);
    throw error;
  }

<<<<<<< HEAD
  return (data ?? []) as Alert[];
}

/**
 * Fetch ALL alerts (read and unread) for a cuidador, joined with detection data.
 */
export async function fetchAllAlerts(cuidadorId: string): Promise<Alert[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*, detection:detections(*)")
    .eq("cuidador_id", cuidadorId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar alertas:", error.message);
    throw error;
  }

  return (data ?? []) as Alert[];
}

/**
 * Mark a single alert as read.
=======
  return data as Alert[];
}

/**
 * Marca um alerta específico como lido.
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
 */
export async function markAlertAsRead(alertId: string): Promise<void> {
  const { error } = await supabase
    .from("alerts")
    .update({ lido: true })
    .eq("id", alertId);

  if (error) {
    console.error("Erro ao marcar alerta como lido:", error.message);
    throw error;
  }
}
<<<<<<< HEAD

/**
 * Mark ALL alerts for a cuidador as read.
 */
export async function markAllAlertsAsRead(cuidadorId: string): Promise<void> {
  const { error } = await supabase
    .from("alerts")
    .update({ lido: true })
    .eq("cuidador_id", cuidadorId)
    .eq("lido", false);

  if (error) {
    console.error("Erro ao marcar alertas como lidos:", error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════
// TABLE: users
// RLS: user can only read/write their own row (auth.uid() = id)
// ═══════════════════════════════════════════════════════════════════

/**
 * Update profile fields in the 'users' table.
 * Does NOT update the Supabase Auth email — use supabase.auth.updateUser()
 * separately for that.
 */
export async function updateUserProfile(
  userId: string,
  updates: {
    nome?: string;
    data_nascimento?: string | null;
    modo_claro?: boolean;
    fonte_tamanho?: number;
  }
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar perfil:", error.message);
    throw error;
  }

  return data as UserProfile;
}

/**
 * Delete the user's profile row.
 * Cascade deletes patients → detections → annotations → alerts.
 */
export async function deleteUserProfile(userId: string): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) {
    console.error("Erro ao excluir perfil:", error.message);
    throw error;
  }
}

// Re-exports for convenience
export { supabase } from "./supabaseClient";
export {
  saveAnnotation,
  fetchAnnotations,
  fetchAnnotation,
  deleteAnnotation,
  updateAnnotation,
  fetchAnnotationsByDate,
} from "./annotations";
=======
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
