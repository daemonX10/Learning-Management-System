# Run this to create a new React app with Vite.

param(
    [string]$appName
)

$npxCommand = "npx create-vite $appName --template $framework"
Invoke-Expression -Command $npxCommand

Set-Location -Path $appName
npm install
npm run dev
