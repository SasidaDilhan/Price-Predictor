'use client';
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setError('Access denied. Admin only.');
        } else if (response.status === 401) {
          router.push('/login');
        } else {
          setError(data.error || 'Failed to load dashboard');
        }
        return;
      }

      setDashboardData(data);
    } catch (err) {
      setError('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="space-y-2">
            <p className="text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">{dashboardData?.admin?.username}</span>!
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <span className="font-semibold">{dashboardData?.admin?.email}</span>
            </p>
          </div>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
