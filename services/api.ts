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
        confianca: confianca,
        timestamp: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar detecção no Supabase:", error.message);
    throw error;
  }

  // Se for uma emoção de alerta crítico (medo, enjoo, dor, sono, tristeza), 
  // dispara um alerta automaticamente para o cuidador do paciente
  try {
    // 1. Busca quem é o cuidador responsável por este paciente
    const { data: patient, error: patientErr } = await supabase
      .from("patients")
      .select("cuidador_id")
      .eq("id", patientId)
      .single();

    if (patient && !patientErr) {
      await createAlert(data.id, patient.cuidador_id);
    }
  } catch (err) {
    console.error("Erro ao gerar alerta automático:", err);
  }

  return data as Detection;
}

/**
 * Busca o histórico de detecções de um paciente específico (ou todas).
 */
export async function fetchDetections(
  patientId?: string
): Promise<Detection[]> {
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
    .select()
    .single();

  if (error) {
    console.error("Erro ao cadastrar paciente:", error.message);
    throw error;
  }

  return data as Patient;
}

/**
 * Busca todos os pacientes sob os cuidados de um cuidador específico.
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
    .select()
    .single();

  if (error) {
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
 * Busca alertas não lidos de um cuidador.
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

  return data as Alert[];
}

/**
 * Marca um alerta específico como lido.
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
