@echo off
chcp 65001 >nul
echo Очистка портов 3000 и 3001...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo Node-процессы остановлены.
) else (
    echo Процессы не найдены или уже остановлены.
)
timeout /t 2 /nobreak >nul
echo Готово.
pause
