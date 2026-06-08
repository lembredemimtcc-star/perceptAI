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
<<<<<<< HEAD
    data_nascimento DATE,
    fonte_tamanho INTEGER DEFAULT 16 NOT NULL,
    modo_claro BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS data_nascimento DATE,
    ADD COLUMN IF NOT EXISTS fonte_tamanho INTEGER DEFAULT 16 NOT NULL,
    ADD COLUMN IF NOT EXISTS modo_claro BOOLEAN DEFAULT TRUE NOT NULL;

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

=======
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
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
<<<<<<< HEAD
    titulo VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    data_nota DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

ALTER TABLE annotations
    ADD COLUMN IF NOT EXISTS titulo VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS data_nota DATE DEFAULT CURRENT_DATE;

=======
    texto TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
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

<<<<<<< HEAD
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'detections'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE detections;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'alerts'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
    END IF;
END $$;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
-- As políticas abaixo alinham o banco ao fluxo do app: o usuário autenticado
-- é o cuidador dono dos pacientes, anotações, detecções e alertas associados.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create own profile" ON users;
CREATE POLICY "Users can create own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON users;
CREATE POLICY "Users can delete own profile"
ON users FOR DELETE
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Caregivers can create own patients" ON patients;
CREATE POLICY "Caregivers can create own patients"
ON patients FOR INSERT
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can read own patients" ON patients;
CREATE POLICY "Caregivers can read own patients"
ON patients FOR SELECT
USING (auth.uid() = cuidador_id OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Caregivers can update own patients" ON patients;
CREATE POLICY "Caregivers can update own patients"
ON patients FOR UPDATE
USING (auth.uid() = cuidador_id)
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can delete own patients" ON patients;
CREATE POLICY "Caregivers can delete own patients"
ON patients FOR DELETE
USING (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can create annotations for own patients" ON annotations;
CREATE POLICY "Caregivers can create annotations for own patients"
ON annotations FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can read own annotations" ON annotations;
CREATE POLICY "Caregivers can read own annotations"
ON annotations FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can update own annotations" ON annotations;
CREATE POLICY "Caregivers can update own annotations"
ON annotations FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can delete own annotations" ON annotations;
CREATE POLICY "Caregivers can delete own annotations"
ON annotations FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = annotations.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can read own detections" ON detections;
CREATE POLICY "Caregivers can read own detections"
ON detections FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = detections.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can create own detections" ON detections;
CREATE POLICY "Caregivers can create own detections"
ON detections FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM patients
        WHERE patients.id = detections.patient_id
          AND patients.cuidador_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Caregivers can read own alerts" ON alerts;
CREATE POLICY "Caregivers can read own alerts"
ON alerts FOR SELECT
USING (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can create own alerts" ON alerts;
CREATE POLICY "Caregivers can create own alerts"
ON alerts FOR INSERT
WITH CHECK (auth.uid() = cuidador_id);

DROP POLICY IF EXISTS "Caregivers can update own alerts" ON alerts;
CREATE POLICY "Caregivers can update own alerts"
ON alerts FOR UPDATE
USING (auth.uid() = cuidador_id)
WITH CHECK (auth.uid() = cuidador_id);
=======
ALTER PUBLICATION supabase_realtime ADD TABLE detections, alerts;
>>>>>>> 6e356074b43012b074fc0ec41035721fb5edb60b
