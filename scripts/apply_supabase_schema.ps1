Param(
  [string]$ProjectRef = "hqdhcocqtbgrgovcykcr"
)

if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
  Write-Error "supabase CLI not found. Install: https://supabase.com/docs/guides/cli"
  exit 2
}

$sql = Get-Content -Path (Join-Path $PSScriptRoot "..\supabase_schema.sql") -Raw
Write-Host "Applying schema to Supabase project: $ProjectRef"
supabase db remote set https://hqdhcocqtbgrgovcykcr.supabase.co --project-ref $ProjectRef

Write-Output $sql | supabase db query
Write-Host "Done."
