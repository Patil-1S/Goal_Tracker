"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <nav className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <ul>
          <li>
            <Link href="/" className="block py-2 hover:bg-gray-700 rounded">Home</Link>
          </li>
          <li>
            <Link href="/register" className="block py-2 hover:bg-gray-700 rounded">Register</Link>
          </li>
          {/* Add other navigation items here */}
        </ul>
        <div className="mt-auto">
          <Link href="/login" className="block py-2  hover:bg-gray-700 rounded">Login</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <header className="mb-6">
          <h1 className="text-5xl font-bold text-center">TODO APPLICATION</h1>
        </header>
        <div className="text-center">
          <p className="text-lg">Welcome to your TODO application!</p>
        </div>
      </main>
    </div>
  );
}

