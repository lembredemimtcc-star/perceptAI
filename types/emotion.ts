export type EmotionType = "medo" | "enjoo" | "dor" | "sono" | "tristeza";

export interface Detection {
  id: string;
  patient_id: string;
  tipo_emocao: EmotionType;
  confianca: number;
  timestamp: string;
  created_at: string;
}

export interface Alert {
  id: string;
  detection_id: string;
  cuidador_id: string;
  lido: boolean;
  created_at: string;
  detection?: Detection;
}
