import { supabase } from "./supabaseClient";
import { Annotation } from "../types/annotation";

// ═══════════════════════════════════════════════════════════════════
// TABLE: annotations
// RLS: cuidador can CRUD annotations for their own patients only
//      (checked via patients.cuidador_id = auth.uid())
// ═══════════════════════════════════════════════════════════════════

export async function saveAnnotation(
  patientId: string,
  titulo: string,
  texto: string,
  dataNota?: string
): Promise<Annotation> {
  const { data, error } = await supabase
    .from("annotations")
    .insert([
      {
        patient_id: patientId,
        titulo,
        texto,
        data_nota: dataNota || new Date().toISOString().slice(0, 10),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar anotação:", error.message);
    throw error;
  }

  return data as Annotation;
}

export async function fetchAnnotations(patientId: string): Promise<Annotation[]> {
  const { data, error } = await supabase
    .from("annotations")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar anotações:", error.message);
    throw error;
  }

  return (data ?? []) as Annotation[];
}

/**
 * Fetch all annotations for a patient that fall on a specific date (YYYY-MM-DD).
 * Used by the calendar day modal.
 */
export async function fetchAnnotationsByDate(
  patientId: string,
  date: string
): Promise<Annotation[]> {
  const { data, error } = await supabase
    .from("annotations")
    .select("*")
    .eq("patient_id", patientId)
    .eq("data_nota", date)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar anotações por data:", error.message);
    throw error;
  }

  return (data ?? []) as Annotation[];
}

export async function fetchAnnotation(annotationId: string): Promise<Annotation> {
  const { data, error } = await supabase
    .from("annotations")
    .select("*")
    .eq("id", annotationId)
    .single();

  if (error) {
    console.error("Erro ao buscar anotação:", error.message);
    throw error;
  }

  return data as Annotation;
}

export async function deleteAnnotation(annotationId: string): Promise<void> {
  const { error } = await supabase
    .from("annotations")
    .delete()
    .eq("id", annotationId);

  if (error) {
    console.error("Erro ao deletar anotação:", error.message);
    throw error;
  }
}

export async function updateAnnotation(
  annotationId: string,
  titulo: string,
  texto: string,
  dataNota?: string
): Promise<Annotation> {
  const { data, error } = await supabase
    .from("annotations")
    .update({
      titulo,
      texto,
      data_nota: dataNota || new Date().toISOString().slice(0, 10),
    })
    .eq("id", annotationId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar anotação:", error.message);
    throw error;
  }

  return data as Annotation;
}
