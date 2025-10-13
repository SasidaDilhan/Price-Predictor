"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  LayoutDashboard,
  Package,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "bg-blue-500" },
    {
      label: "Total Orders",
      value: "856",
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      label: "Revenue",
      value: "$45,678",
      icon: DollarSign,
      color: "bg-purple-500",
    },
    {
      label: "Growth",
      value: "+23%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
  ];

  const handleAddProduct = () => {
    router.push("/admin/products/addproduct");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {session?.user?.name}!
            </p>
          </div>

          <div className="border-t border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Orders
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order #{1000 + i}
                        </p>
                        <p className="text-sm text-gray-600">Customer {i}</p>
                      </div>
                      <span className="text-green-600 font-semibold">
                        $1,299
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Popular Products
                </h2>
                <div className="space-y-3">
                  {[
                    "Dell XPS 15",
                    'MacBook Pro 14"',
                    "HP Pavilion",
                    "Lenovo ThinkPad",
                  ].map((product, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <p className="font-semibold text-gray-800">{product}</p>
                      <span className="text-blue-600 font-semibold">
                        {50 - i * 5} sold
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Product Management
                </h2>
                <p className="text-gray-600 mt-1">
                  Manage your product inventory
                </p>
              </div>
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No products yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by adding your first product
                </p>
                <button
                  onClick={handleAddProduct}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
