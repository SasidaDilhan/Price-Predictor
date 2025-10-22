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
  Store,
  Mail,
  ShieldUser,
} from "lucide-react";

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [sellerInfo, setSellerInfo] = useState<any>({
    sellerName: "",
    email: "",
    businessName: "",
    businessAddress: "",
    businessLogo: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/seller?id=${session.user.id}`);
        const data = await res.json();
        if (data.seller) {
          setSellerInfo(data.seller);
          ;
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSellerInfo();
  }, [session?.user?.id]);
console.log("seller Info :", sellerInfo)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
  ];

  const handleAddProduct = () => {
    router.push("/products/addproduct");
  };

  // Example seller info (replace with API or DB data)
  //   const sellerInfo = {
  //     name: session?.user?.name,
  //     email: session?.user?.email || "seller@example.com",
  //     storeName: "King Products",
  //     totalProducts: 12,
  //     totalOrders: 45,
  //     totalRevenue: "$9,850",
  //   };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Seller Dashboard
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

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Seller Information
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Seller Details */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldUser className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-700 font-semibold">Name</h3>
                </div>
                <p className="text-gray-800">{sellerInfo.sellerName}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-700 font-semibold">Email</h3>
                </div>
                <p className="text-gray-800">{sellerInfo.email}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-700 font-semibold">Store Name</h3>
                </div>
                <p className="text-gray-800">{sellerInfo.businessName}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-5 h-5 text-green-600" />
                  <h3 className="text-gray-700 font-semibold">
                    Total Products
                  </h3>
                </div>
                <p className="text-gray-800">{sellerInfo.totalProducts}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  <h3 className="text-gray-700 font-semibold">Total Orders</h3>
                </div>
                <p className="text-gray-800">{sellerInfo.totalOrders}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  <h3 className="text-gray-700 font-semibold">Revenue</h3>
                </div>
                <p className="text-gray-800 font-semibold">
                  {sellerInfo.totalRevenue}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
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

            {loading ? (
              <div className="text-gray-600">Loading products...</div>
            ) : products.length === 0 ? (
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
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-gray-50 p-4 rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
