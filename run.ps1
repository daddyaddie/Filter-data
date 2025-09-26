param(
  [switch]$BackendOnly,
  [switch]$FrontendOnly
)

# Resolve repo root based on this script's location
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not $FrontendOnly) {
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$root\backend`"; npm run dev"
}

if (-not $BackendOnly) {
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$root\frontend`"; npm start"
}

Write-Host "Launched backend and frontend in separate terminals."