#!/bin/bash

echo "Starting Next.js + Python development servers..."
echo ""

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

echo "Starting Python backend on port 8000..."
cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting Next.js frontend on port 3000..."
pnpm dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are running:"
echo "- Python Backend: http://localhost:8000"
echo "- Next.js Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID