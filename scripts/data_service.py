#!/usr/bin/env python3
"""
Python data service for Next.js API routes
This module contains all the business logic and data operations
"""

import json
import sys
from datetime import datetime
from typing import List, Dict, Any, Optional

# Dummy data (same as before, but now in a separate Python module)
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

def get_users() -> Dict[str, Any]:
    """Get all users"""
    return {
        "users": users_data,
        "total": len(users_data)
    }

def get_user_by_id(user_id: int) -> Dict[str, Any]:
    """Get user by ID"""
    user = next((user for user in users_data if user["id"] == user_id), None)
    if user:
        return user
    return {"error": "User not found"}

def get_products() -> Dict[str, Any]:
    """Get all products"""
    return {
        "products": products_data,
        "total": len(products_data)
    }

def get_product_by_id(product_id: int) -> Dict[str, Any]:
    """Get product by ID"""
    product = next((product for product in products_data if product["id"] == product_id), None)
    if product:
        return product
    return {"error": "Product not found"}

def get_stats() -> Dict[str, Any]:
    """Get dashboard statistics"""
    return {
        "total_users": len(users_data),
        "total_products": len(products_data),
        "products_in_stock": len([p for p in products_data if p["in_stock"]]),
        "server_time": datetime.now().isoformat(),
        "api_type": "Next.js + Python Integration"
    }

def process_request(action: str, params: Optional[Dict] = None) -> Dict[str, Any]:
    """Process API requests based on action type"""
    try:
        if action == "get_users":
            return get_users()
        elif action == "get_user":
            user_id = int(params.get("id", 0)) if params else 0
            return get_user_by_id(user_id)
        elif action == "get_products":
            return get_products()
        elif action == "get_product":
            product_id = int(params.get("id", 0)) if params else 0
            return get_product_by_id(product_id)
        elif action == "get_stats":
            return get_stats()
        else:
            return {"error": f"Unknown action: {action}"}
    except Exception as e:
        return {"error": f"Python processing error: {str(e)}"}

if __name__ == "__main__":
    # This script can be called from Node.js with command line arguments
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No action specified"}))
        sys.exit(1)
    
    action = sys.argv[1]
    params = {}
    
    # Parse additional parameters
    if len(sys.argv) > 2:
        try:
            params = json.loads(sys.argv[2])
        except json.JSONDecodeError:
            # If not JSON, treat as simple key-value
            if len(sys.argv) > 2:
                params = {"id": sys.argv[2]}
    
    result = process_request(action, params)
    print(json.dumps(result, indent=2))