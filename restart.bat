@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === Очистка портов ===
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo === Запуск проекта ===
call npx concurrently "npm run dev:server" "npm run dev"
pause
