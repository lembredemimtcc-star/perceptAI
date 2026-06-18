<<<<<<< HEAD
-- =====================================================================
-- PERCEPTAI - SCRIPT DEFINITIVO DE CONFIGURAÇÃO DO BANCO (SUPABASE)
-- =====================================================================
-- Projeto: hqdhcocqtbgrgovcykcr
-- Como usar: cole este script completo no SQL Editor do Supabase
-- (https://supabase.com/dashboard/project/hqdhcocqtbgrgovcykcr/sql/new)
-- e clique em "Run". É seguro executar mais de uma vez (idempotente).
--
-- O que este script faz:
--   0. Remove tabelas de uma versão antiga/divergente do schema, SE
--      elas existirem (ex: "user_profiles" com colunas diferentes das
--      usadas pelo app atual). Não afeta nada se elas não existirem.
--   1-5. Cria as 5 tabelas que o app (front-end Expo + back-end .NET)
--      realmente usa: users, patients, detections, annotations, alerts.
--   6. Liga o Realtime para detections e alerts (usado pela tela de
--      alertas/histórico para atualização em tempo real).
--   7. Habilita Row Level Security e cria todas as policies necessárias
--      para que cada cuidador só veja/edite os dados dos seus pacientes.
-- =====================================================================


-- =====================================================================
-- 0. LIMPEZA DE SCHEMA ANTIGO (SE EXISTIR)
-- =====================================================================
-- Uma versão anterior do projeto (supabase/init.sql) usava nomes de
-- tabela/coluna diferentes dos usados pelo app atual (ex: user_profiles,
-- caregiver_id, birth_date, image_url). Se essas tabelas "antigas" foram
-- criadas em algum momento, este bloco as remove com segurança para que
-- não fiquem dados órfãos ou nomes conflitantes no banco.
--
-- IMPORTANTE: isso só afasta a tabela "user_profiles" (que não é usada
-- por nenhuma parte do código atual). As tabelas "patients", "detections",
-- "annotations" e "alerts" abaixo são reaproveitadas/atualizadas, nunca
-- apagadas, para preservar dados que você já tenha gerado usando o app.

DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- =====================================================================
-- 1. TABELA: users
-- =====================================================================
-- Armazena dados complementares dos usuários (cuidadores e pacientes).
-- O id é o MESMO id gerado pelo Supabase Auth (auth.users.id).

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('cuidador', 'paciente')),
    data_nascimento DATE,
    fonte_tamanho INTEGER DEFAULT 16 NOT NULL,
    modo_claro BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- Garante que as colunas existam mesmo se a tabela já tiver sido criada
-- antes com uma versão mais antiga da estrutura.
ALTER TABLE public.users
    ADD COLUMN IF NOT EXISTS data_nascimento DATE,
    ADD COLUMN IF NOT EXISTS fonte_tamanho INTEGER DEFAULT 16 NOT NULL,
    ADD COLUMN IF NOT EXISTS modo_claro BOOLEAN DEFAULT TRUE NOT NULL;

-- Trigger: ao criar um usuário no Supabase Auth, cria automaticamente
-- a linha correspondente em public.users (usando metadata nome/tipo
-- enviada no signUp pelo front-end).
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, nome, email, tipo)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'tipo', 'cuidador')
    )
    ON CONFLICT (id) DO UPDATE SET
        nome = EXCLUDED.nome,
        email = EXCLUDED.email,
        tipo = EXCLUDED.tipo;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- =====================================================================
-- 2. TABELA: patients
-- =====================================================================
-- Pacientes cadastrados e o cuidador responsável por cada um.

CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    cuidador_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 3. TABELA: detections
-- =====================================================================
-- Microexpressões faciais detectadas em tempo real pela API C# (ONNX).

CREATE TABLE IF NOT EXISTS public.detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    tipo_emocao VARCHAR(50) NOT NULL CHECK (tipo_emocao IN ('medo', 'enjoo', 'dor', 'sono', 'tristeza')),
    confianca FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 4. TABELA: annotations
-- =====================================================================
-- Notas do cuidador sobre um paciente (tela "anotação").

CREATE TABLE IF NOT EXISTS public.annotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    data_nota DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

ALTER TABLE public.annotations
    ADD COLUMN IF NOT EXISTS titulo VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS data_nota DATE DEFAULT CURRENT_DATE;

-- =====================================================================
-- 5. TABELA: alerts
-- =====================================================================
-- Alertas disparados ao cuidador quando ocorre uma detecção crítica.

CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detection_id UUID REFERENCES public.detections(id) ON DELETE CASCADE NOT NULL,
    cuidador_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    lido BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 6. REALTIME (atualizações em tempo real)
-- =====================================================================
-- Permite que a tela de alertas/histórico do app receba novas
-- detecções e alertas instantaneamente via WebSocket.

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'detections'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.detections;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'alerts'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
    END IF;
END $$;

-- =====================================================================
-- 7. ROW LEVEL SECURITY (RLS) E POLICIES
-- =====================================================================
-- Regra geral: um cuidador autenticado só acessa os próprios dados
-- (perfil) e os dados dos pacientes vinculados a ele (cuidador_id).
-- O back-end .NET usa a Service Role Key, que ignora RLS por padrão
-- (necessário para o fluxo automático de detecção -> alerta).

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- ---- users ----------------------------------------------------------

DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
CREATE POLICY "Users can create own profile"
ON public.users FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile"
ON public.users FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON public.users;
CREATE POLICY "Users can delete own profile"
ON public.users FOR DELETE
USING (auth.uid() = id);

-- ---- patients ---------------------------------------------------------

DROP POLICY IF EXISTS "Caregivers can create own patients" ON public.patients;
CREATE POLICY "Caregivers can create own patients"
ON public.patients FOR INSERT
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can read own patients" ON public.patients;
CREATE POLICY "Caregivers can read own patients"
ON public.patients FOR SELECT
USING (auth.uid() = cuidador_id OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Caregivers can update own patients" ON public.patients;
CREATE POLICY "Caregivers can update own patients"
ON public.patients FOR UPDATE
USING (auth.uid() = cuidador_id)
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can delete own patients" ON public.patients;
CREATE POLICY "Caregivers can delete own patients"
ON public.patients FOR DELETE
USING (auth.uid() = cuidador_id);

-- ---- annotations --------------------------------------------------------

DROP POLICY IF EXISTS "Caregivers can create annotations for own patients" ON public.annotations;
CREATE POLICY "Caregivers can create annotations for own patients"
ON public.annotations FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can read own annotations" ON public.annotations;
CREATE POLICY "Caregivers can read own annotations"
ON public.annotations FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can update own annotations" ON public.annotations;
CREATE POLICY "Caregivers can update own annotations"
ON public.annotations FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can delete own annotations" ON public.annotations;
CREATE POLICY "Caregivers can delete own annotations"
ON public.annotations FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

-- ---- detections -------------------------------------------------------

DROP POLICY IF EXISTS "Caregivers can read own detections" ON public.detections;
CREATE POLICY "Caregivers can read own detections"
ON public.detections FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = detections.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can create own detections" ON public.detections;
CREATE POLICY "Caregivers can create own detections"
ON public.detections FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.id = detections.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

-- (Não há policy de UPDATE/DELETE para detections de propósito: o app
--  nunca edita ou apaga uma detecção pelo front-end, apenas insere e lê.
--  A exclusão acontece em cascata quando o paciente é removido.)

-- ---- alerts -------------------------------------------------------------

DROP POLICY IF EXISTS "Caregivers can read own alerts" ON public.alerts;
CREATE POLICY "Caregivers can read own alerts"
ON public.alerts FOR SELECT
USING (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can create own alerts" ON public.alerts;
CREATE POLICY "Caregivers can create own alerts"
ON public.alerts FOR INSERT
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can update own alerts" ON public.alerts;
CREATE POLICY "Caregivers can update own alerts"
ON public.alerts FOR UPDATE
USING (auth.uid() = cuidador_id)
WITH CHECK (auth.uid() = cuidador_id);

-- =====================================================================
-- FIM DO SCRIPT
-- =====================================================================
-- Depois de rodar, vá em Table Editor no painel do Supabase e confirme
-- que aparecem exatamente estas 5 tabelas: users, patients, detections,
-- annotations, alerts — cada uma com RLS habilitado (ícone de cadeado).
=======
/* Supabase initialization script for PerceptAI */

-- Enable required extensions
create extension if not exists pgcrypto;

-- 1. users table (Supabase Auth provides auth.users, but we can reference it)
-- We will store additional profile data.
create table if not exists public.user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    created_at timestamp with time zone default now()
);

-- 2. patients table (patients linked to a user/guardian)
create table if not exists public.patients (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    name text not null,
    birth_date date,
    created_at timestamp with time zone default now()
);

-- 3. detections table (emotion detection events)
create table if not exists public.detections (
    id uuid primary key default gen_random_uuid(),
    patient_id uuid references public.patients(id) on delete cascade,
    emotion varchar(20) not null, -- e.g., fear, nausea, pain, sleepiness, sadness
    confidence numeric(5,2) not null,
    captured_at timestamp with time zone default now(),
    image_url text,
    created_at timestamp with time zone default now()
);

-- 4. annotations table (caregiver notes on a detection)
create table if not exists public.annotations (
    id uuid primary key default gen_random_uuid(),
    detection_id uuid references public.detections(id) on delete cascade,
    caregiver_id uuid references auth.users(id) on delete set null,
    note text,
    created_at timestamp with time zone default now()
);

-- 5. alerts table (notifications sent to caregivers)
create table if not exists public.alerts (
    id uuid primary key default gen_random_uuid(),
    detection_id uuid references public.detections(id) on delete cascade,
    caregiver_id uuid references auth.users(id) on delete set null,
    status varchar(20) default 'pending', -- pending, sent, acknowledged
    sent_at timestamp with time zone,
    created_at timestamp with time zone default now()
);

/* Row level security */
alter table public.user_profiles enable row level security;
alter table public.patients enable row level security;
alter table public.detections enable row level security;
alter table public.annotations enable row level security;
alter table public.alerts enable row level security;

/* Policies */
-- Users can view and update their own profile
create policy "allow_self_profile" on public.user_profiles
    for all using (auth.uid() = id) with check (auth.uid() = id);

-- Caregivers (users) can insert patients they manage and view theirs
create policy "patient_owner" on public.patients
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Detections: a caregiver can insert detections for patients they own, and read theirs
create policy "detections_insert" on public.detections
    for insert with check (auth.uid() = (
        select user_id from public.patients where id = patient_id
    ));
create policy "detections_select" on public.detections
    for select using (auth.uid() = (
        select user_id from public.patients where id = patient_id
    ));

-- Annotations: caregiver can insert/read notes on detections they have access to
create policy "annotations_access" on public.annotations
    for all using (auth.uid() = caregiver_id);

-- Alerts: caregiver can view alerts addressed to them
create policy "alerts_access" on public.alerts
    for all using (auth.uid() = caregiver_id);

/* Enable realtime */
-- Supabase realtime works automatically for tables with RLS enabled.
-- Ensure the `realtime` subscription is allowed on the tables above.

-- Optional: set up storage bucket for images (outside SQL) via Supabase UI.
>>>>>>> 50c73db75805fa291aade0fa75df626656870758
