$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

$nodeVersion = "v24.14.0"
$toolsDir = Join-Path $PSScriptRoot ".tools"
$nodeDir = Join-Path $toolsDir "node-$nodeVersion-win-x64"
$npm = Join-Path $nodeDir "npm.cmd"
$npx = Join-Path $nodeDir "npx.cmd"
$zipPath = Join-Path $toolsDir "node-$nodeVersion-win-x64.zip"
$nodeUrl = "https://nodejs.org/dist/$nodeVersion/node-$nodeVersion-win-x64.zip"

Write-Host ""
Write-Host "Step 0/4: Preparing a newer Node.js for this website..."
if (-not (Test-Path -LiteralPath $npm)) {
  New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
  Write-Host "Downloading Node.js $nodeVersion from nodejs.org..."
  Invoke-WebRequest -Uri $nodeUrl -OutFile $zipPath
  Write-Host "Unpacking Node.js..."
  Expand-Archive -Path $zipPath -DestinationPath $toolsDir -Force
}

$env:Path = "$nodeDir;$env:Path"

Write-Host ""
Write-Host "Using:"
node --version
& $npm --version

Write-Host ""
Write-Host "Step 1/4: Installing website dependencies..."
& $npm install
if ($LASTEXITCODE -ne 0) {
  throw "Dependency installation failed."
}

Write-Host ""
Write-Host "Step 2/4: Checking that the website can build..."
& $npm run build
if ($LASTEXITCODE -ne 0) {
  throw "Build failed. Please send the last lines in this window to Codex."
}

Write-Host ""
Write-Host "Step 3/4: Logging in to Vercel..."
Write-Host "A browser or login prompt may open. Finish login, then return here."
& $npx --yes vercel@latest login
if ($LASTEXITCODE -ne 0) {
  throw "Vercel login failed."
}

Write-Host ""
Write-Host "Step 4/4: Deploying the website..."
& $npx --yes vercel@latest --prod
if ($LASTEXITCODE -ne 0) {
  throw "Deployment failed. Please send the last lines in this window to Codex."
}

Write-Host ""
Write-Host "Done. The public website link is shown above."
