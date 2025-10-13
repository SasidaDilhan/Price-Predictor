"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Laptop, ShoppingCart, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-blue-100 transition-colors"
          >
            <Laptop className="w-6 h-6" />
            Compute Buddy
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-100 transition-colors">
              Home
            </Link>
            <Link
              href="/user/products"
              className="hover:text-blue-100 transition-colors"
            >
              Products
            </Link>

            {session ? (
              <>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="hover:text-blue-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-blue-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
