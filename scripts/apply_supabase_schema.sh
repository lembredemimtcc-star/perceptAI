#!/usr/bin/env bash
# Applies the perceptAI Supabase schema using the supabase CLI.
# Usage: ./apply_supabase_schema.sh <project-ref>

set -euo pipefail

PROJECT_REF=${1:-hqdhcocqtbgrgovcykcr}
SQL_FILE="./supabase_schema.sql"

if ! command -v supabase >/dev/null 2>&1; then
  echo "supabase CLI not found. Install: https://supabase.com/docs/guides/cli"
  exit 2
fi

echo "Applying schema to Supabase project: $PROJECT_REF"
supabase db remote set https://hqdhcocqtbgrgovcykcr.supabase.co --project-ref $PROJECT_REF
supabase db query < "$SQL_FILE"

echo "Done."
