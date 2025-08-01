# Next.js + Python API Setup

This project demonstrates how to integrate a Python FastAPI backend with a Next.js frontend. The Python backend provides RESTful APIs with dummy data, and the Next.js frontend consumes these APIs to display dynamic content.

## 🏗️ Project Structure

```
next-python/
├── app/                     # Next.js frontend (React components)
├── backend/                 # Python FastAPI backend
│   ├── main.py             # FastAPI application with API routes
│   └── requirements.txt    # Python dependencies
├── run-dev.bat             # Windows script to run both servers
├── run-dev.sh              # Linux/Mac script to run both servers
└── package.json            # Node.js dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+) and **pnpm** installed
- **Python** (v3.8+) installed
- Basic knowledge of Next.js and Python

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
# Double-click run-dev.bat or run in terminal:
./run-dev.bat
```

**For Linux/Mac:**
```bash
# Make executable and run:
chmod +x run-dev.sh
./run-dev.sh
```

### Option 2: Manual Setup

1. **Install Node.js dependencies:**
   ```bash
   pnpm install
   ```

2. **Install Python dependencies:**
   ```bash
   # Option A: Using npm script
   pnpm run install:backend
   
   # Option B: Manual installation
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

3. **Start both servers in separate terminals:**

   **Terminal 1 - Python Backend:**
   ```bash
   pnpm run backend
   # or manually:
   cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   **Terminal 2 - Next.js Frontend:**
   ```bash
   pnpm dev
   ```

## 🌐 Accessing the Application

- **Frontend (Next.js):** http://localhost:3000
- **Backend API (Python):** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs (Swagger UI)

## 📡 Available API Endpoints

The Python backend provides these RESTful endpoints:

- `GET /` - Welcome message with API info
- `GET /api/users` - Get all users
- `GET /api/users/{user_id}` - Get specific user
- `GET /api/products` - Get all products  
- `GET /api/products/{product_id}` - Get specific product
- `GET /api/stats` - Get dashboard statistics

## 🔧 Development

### Frontend (Next.js)
- Built with **React 19** and **TypeScript**
- Uses **Tailwind CSS** for styling
- Fetches data from Python API using native `fetch()`
- Includes loading states and error handling

### Backend (Python)
- Built with **FastAPI** framework
- Includes **CORS** middleware for cross-origin requests
- Provides **OpenAPI/Swagger** documentation
- Uses **Pydantic** models for type validation
- Includes dummy data for users and products

### Key Features
- ✅ **Type Safety:** Full TypeScript support
- ✅ **CORS Configured:** Frontend can call backend APIs
- ✅ **Error Handling:** Graceful error states in UI
- ✅ **Loading States:** User-friendly loading indicators
- ✅ **Responsive Design:** Works on mobile and desktop
- ✅ **Real-time Data:** APIs provide live server timestamps

## 🔄 CORS Configuration

The Python backend is configured to accept requests from `http://localhost:3000` (Next.js default port). If you change the frontend port, update the CORS settings in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🛠️ Customization

### Adding New API Endpoints

1. **Add endpoint in `backend/main.py`:**
   ```python
   @app.get("/api/new-endpoint")
   async def new_endpoint():
       return {"message": "Hello from new endpoint!"}
   ```

2. **Update frontend to consume the new API:**
   ```typescript
   const response = await fetch(`${API_BASE}/api/new-endpoint`);
   const data = await response.json();
   ```

### Modifying Dummy Data

Edit the `users_data` and `products_data` arrays in `backend/main.py` to change the sample data returned by the APIs.

## 📦 Production Deployment

### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend (Next.js)
```bash
pnpm build
pnpm start
```

### Environment Variables
For production, consider using environment variables for:
- API base URL (`NEXT_PUBLIC_API_URL`)
- Database connections
- Authentication secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Happy coding! 🎉**