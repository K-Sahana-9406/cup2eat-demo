@echo off
title CUP2EAT — EAT YOUR DRINK (Demo Server)
echo ========================================================
echo    CUP2EAT - Premium E-Commerce Website Demonstration
echo           Design Direction: Edible Luxury
echo ========================================================
echo.
echo Starting local web server on http://localhost:5173 ...
echo.

rem Try Python 3.11 first
if exist "C:\Users\ELCOT\AppData\Local\Programs\Python\Python311\python.exe" (
    start "" http://localhost:5173
    "C:\Users\ELCOT\AppData\Local\Programs\Python\Python311\python.exe" -m http.server 5173
    goto end
)

rem Fallback to Python in PATH
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    start "" http://localhost:5173
    python -m http.server 5173
    goto end
)

rem Fallback to Node.js
if exist "server.js" (
    start "" http://localhost:5173
    node server.js
    goto end
)

echo [Error] Could not find Python or Node.js to start server.
pause

:end

