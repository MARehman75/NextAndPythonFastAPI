from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import json
from datetime import datetime

app = FastAPI(title="Next.js Python API", version="1.0.0")

# Configure CORS to allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data
users_data = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "Developer",
        "joined": "2023-01-15"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "role": "Designer",
        "joined": "2023-02-20"
    },
    {
        "id": 3,
        "name": "Mike Johnson",
        "email": "mike@example.com",
        "role": "Product Manager",
        "joined": "2023-03-10"
    }
]

products_data = [
    {
        "id": 1,
        "name": "Laptop Pro",
        "price": 1299.99,
        "category": "Electronics",
        "in_stock": True,
        "description": "High-performance laptop for professionals"
    },
    {
        "id": 2,
        "name": "Wireless Mouse",
        "price": 49.99,
        "category": "Accessories",
        "in_stock": True,
        "description": "Ergonomic wireless mouse with precision tracking"
    },
    {
        "id": 3,
        "name": "Coffee Maker",
        "price": 149.99,
        "category": "Kitchen",
        "in_stock": False,
        "description": "Automatic drip coffee maker with timer"
    }
]

@app.get("/")
async def root():
    return {
        "message": "Welcome to Next.js Python API!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/users")
async def get_users():
    return {
        "users": users_data,
        "total": len(users_data)
    }

@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    user = next((user for user in users_data if user["id"] == user_id), None)
    if user:
        return user
    return {"error": "User not found"}

@app.get("/api/products")
async def get_products():
    return {
        "products": products_data,
        "total": len(products_data)
    }

@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    product = next((product for product in products_data if product["id"] == product_id), None)
    if product:
        return product
    return {"error": "Product not found"}

@app.get("/api/stats")
async def get_stats():
    return {
        "total_users": len(users_data),
        "total_products": len(products_data),
        "products_in_stock": len([p for p in products_data if p["in_stock"]]),
        "server_time": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)