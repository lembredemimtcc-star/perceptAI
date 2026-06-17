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
