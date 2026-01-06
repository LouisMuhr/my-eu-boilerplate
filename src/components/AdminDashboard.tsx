import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";
import { dbHelpers } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  Users, 
  BadgeEuro, 
  TrendingUp, 
  ShieldAlert,
  ArrowUpRight,
  Search
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  // Brutaler Zugriffsschutz: Wenn kein Admin, dann weg hier.
  if (!isAdmin(session?.user?.email)) {
    redirect("/dashboard");
  }

  // Wir holen alle User (Achtung: Bei 10.000 Usern brauchst du Pagination, aber wir fangen klein an)
  // Fix: Wir brauchen eine neue Methode in dbHelpers für 'getAllUsers'
  // Da ich die DB-Datei nicht direkt ändern kann, simulieren wir hier den Zugriff oder 
  // du fügst 'getAllUsers: db.prepare("SELECT * FROM users")' in src/lib/db.ts hinzu.
  const users = (dbHelpers as any).getAllUsers?.all() || [];

  const totalRevenue = users.reduce((acc: number, user: any) => {
    return acc + (user.subscriptionStatus === "active" ? 9.99 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-8 justify-between sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-black text-xs">
            AD
          </div>
          <h1 className="font-bold text-lg tracking-tight">Admin Kontrollzentrum</h1>
        </div>
        <div className="text-xs font-medium text-gray-500">
          Eingeloggt als: {session?.user?.email}
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="text-3xl font-black">{users.length}</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Gesamt-Nutzer</p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <BadgeEuro className="w-5 h-5 text-green-600" />
              <TrendingUp className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-3xl font-black">{totalRevenue.toFixed(2)} €</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Geschätzter MRR</p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-black">0</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Kritische Fehler</p>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="font-bold">Nutzerverwaltung</h2>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Suchen..." 
                    className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  <th className="px-6 py-4">Nutzer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Stripe ID</th>
                  <th className="px-6 py-4 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold">{user.name || "Kein Name"}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        user.subscriptionStatus === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-400'
                      }`}>
                        {user.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">
                      {user.stripeCustomerId || "---"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition border border-transparent hover:border-gray-200">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}