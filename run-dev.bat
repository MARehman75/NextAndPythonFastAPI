@echo off
echo Starting Next.js + Python development servers...
echo.
echo Starting Python backend on port 8000...
start "Python Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak > nul
echo Starting Next.js frontend on port 3000...
start "Next.js Frontend" cmd /k "pnpm dev"
echo.
echo Both servers are starting in separate windows:
echo - Python Backend: http://localhost:8000
echo - Next.js Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul