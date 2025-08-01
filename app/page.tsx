"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  in_stock: boolean;
  description: string;
}

interface Stats {
  total_users: number;
  total_products: number;
  products_in_stock: number;
  server_time: string;
  api_type: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel from Next.js API routes (which execute Python scripts)
        const [usersRes, productsRes, statsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/products"),
          fetch("/api/stats")
        ]);

        if (!usersRes.ok || !productsRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch data from Next.js Python API");
        }

        const [usersData, productsData, statsData] = await Promise.all([
          usersRes.json(),
          productsRes.json(),
          statsRes.json()
        ]);

        setUsers(usersData.users);
        setProducts(productsData.products);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading data from Python API...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <p className="text-sm mt-2 text-gray-600">
            Make sure Python is installed and accessible from the command line
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-6"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl font-bold mb-2">Next.js + Python API Demo</h1>
          <p className="text-gray-600">
            This page fetches data from Python scripts executed by Next.js API routes
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Total Users</h3>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total_users}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Total Products</h3>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.total_products}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">In Stock</h3>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.products_in_stock}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Server Status</h3>
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">✅ Online</p>
            </div>
          </div>
        )}

        {/* Users Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Users from Python Scripts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{user.role}</p>
                <p className="text-xs text-gray-500">Joined: {user.joined}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Products from Python Scripts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{product.category}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${product.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>Data processed by Python scripts executed through Next.js API routes</p>
          {stats && (
            <>
              <p className="mt-2">Last updated: {new Date(stats.server_time).toLocaleString()}</p>
              <p className="mt-1 text-xs">API Type: {stats.api_type}</p>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
