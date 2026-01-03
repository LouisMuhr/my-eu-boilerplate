import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbHelpers } from "@/lib/db";
import DashboardActions from "../../components/DashboardActions"; // ← Client-Component


export default async function Dashboard() {
  const session = await auth();

  const userRow = dbHelpers.getUserById.get(session!.user.id) as any;

  const user = {
    id: session!.user.id as string,
    name: session!.user.name || null,
    email: session!.user.email || null,
    subscriptionStatus: userRow?.subscriptionStatus || "free",
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Willkommen, {user.name || user.email}!
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Deine Daten</h2>
            <p>
              E-Mail: {user.email}
              <br />
              ID: {user.id}
              <br />
              Status: <strong>{user.subscriptionStatus}</strong>
            </p>
          </div>
          {/* Interaktive Buttons als Client-Component */}
          <DashboardActions
            userId={user.id}
            subscriptionStatus={user.subscriptionStatus} // ← Prop hinzufügen
          />
        </div>
      </div>
    </main>
  );
}
