import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="space-y-2">
            <p className="text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">{session.user?.name}</span>!
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <span className="font-semibold">{session.user?.email}</span>
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
