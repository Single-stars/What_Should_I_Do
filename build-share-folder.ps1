$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

$nodeVersion = "v24.14.0"
$toolsDir = Join-Path $PSScriptRoot ".tools"
$nodeDir = Join-Path $toolsDir "node-$nodeVersion-win-x64"
$npm = Join-Path $nodeDir "npm.cmd"
$zipPath = Join-Path $toolsDir "node-$nodeVersion-win-x64.zip"
$nodeUrl = "https://nodejs.org/dist/$nodeVersion/node-$nodeVersion-win-x64.zip"

Write-Host ""
Write-Host "Step 0/2: Preparing Node.js..."
if (-not (Test-Path -LiteralPath $npm)) {
  New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
  Write-Host "Downloading Node.js $nodeVersion from nodejs.org..."
  Invoke-WebRequest -Uri $nodeUrl -OutFile $zipPath
  Write-Host "Unpacking Node.js..."
  Expand-Archive -Path $zipPath -DestinationPath $toolsDir -Force
}

$env:Path = "$nodeDir;$env:Path"

Write-Host ""
Write-Host "Step 1/2: Installing website dependencies..."
& $npm install
if ($LASTEXITCODE -ne 0) {
  throw "Dependency installation failed."
}

Write-Host ""
Write-Host "Step 2/2: Building the shareable website folder..."
& $npm run build
if ($LASTEXITCODE -ne 0) {
  throw "Build failed. Please send the last lines in this window to Codex."
}

Write-Host ""
Write-Host "Done. Upload this folder to Netlify Drop:"
Write-Host (Join-Path $PSScriptRoot "out")
