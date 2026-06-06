-- =====================================================================
-- PERCEPTAI - SUPABASE DATABASE SCHEMA
-- =====================================================================
-- Copie e cole este script no SQL Editor do painel do Supabase
-- para configurar a estrutura de dados do banco do PerceptAI.

-- 1. Tabela: users
-- Armazena informações complementares dos usuários (cuidadores e pacientes)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY, -- Deve ser o mesmo ID gerado pelo Supabase Auth (auth.users)
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('cuidador', 'paciente')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- 2. Tabela: patients
-- Define a relação dos pacientes cadastrados e o cuidador responsável
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Se o paciente tiver conta própria
    cuidador_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL, -- Cuidador responsável
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- 3. Tabela: detections
-- Registra as microexpressões faciais detectadas em tempo real pela API C#
CREATE TABLE IF NOT EXISTS detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
    tipo_emocao VARCHAR(50) NOT NULL CHECK (tipo_emocao IN ('medo', 'enjoo', 'dor', 'sono', 'tristeza')),
    confianca FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- 4. Tabela: annotations
-- Notas assistivas criadas pelo cuidador a respeito de um paciente
CREATE TABLE IF NOT EXISTS annotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
    texto TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- 5. Tabela: alerts
-- Alertas instantâneos disparados para o cuidador caso ocorra uma detecção crítica
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detection_id UUID REFERENCES detections(id) ON DELETE CASCADE NOT NULL,
    cuidador_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    lido BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- CONFIGURAÇÃO DO REALTIME (INSCRIÇÕES AO VIVO)
-- =====================================================================
-- Habilita o canal Supabase Realtime para transmitir novas inserções
-- e alterações de status nas tabelas de detecções e alertas em tempo real.

ALTER PUBLICATION supabase_realtime ADD TABLE detections, alerts;
