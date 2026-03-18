@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Остановка старых процессов...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Запуск проекта...
call npx concurrently "npm run dev:server" "npm run dev"
pause
