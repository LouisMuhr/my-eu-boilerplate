"use client";

import React, { useState, useTransition } from "react";
import { Search, Filter, XCircle, Trash2, UserX, Loader2 } from "lucide-react";
import { deleteUserAction } from "./actions";

interface AdminTableProps {
  initialUsers: any[];
}

export default function AdminTable({ initialUsers }: AdminTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredUsers = initialUsers.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteUserAction(id);
      if (result.success) {
        setDeleteConfirmId(null);
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="font-black text-2xl tracking-tight">Benutzerverwaltung</h2>
          <p className="text-sm text-gray-400 mt-1">Echtzeit-Übersicht deiner {initialUsers.length} Accounts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="E-Mail oder Name suchen..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-6 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none w-72 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black bg-gray-50/50 dark:bg-gray-800/30">
              <th className="px-8 py-5">Benutzer / ID</th>
              <th className="px-8 py-5">Kontakt</th>
              <th className="px-8 py-5">Abo Status</th>
              <th className="px-8 py-5">Zeitraum</th>
              <th className="px-8 py-5 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`group transition-all ${deleteConfirmId === user.id ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-gray-50/40 dark:hover:bg-gray-800/40'}`}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400 text-xs">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="font-black text-gray-900 dark:text-white">{user.name || "Unbekannt"}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{user.id.substring(0, 8)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider w-fit ${
                      user.subscriptionStatus === 'active' 
                      ? 'bg-green-50 text-green-700 border border-green-100' 
                      : user.subscriptionStatus === 'past_due'
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {user.subscriptionStatus}
                    </span>
                    {user.cancelAtPeriodEnd === 1 && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                        <XCircle className="w-3 h-3" /> Gekündigt
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-xs font-bold text-gray-500">
                    {user.currentPeriodEnd ? new Date(user.currentPeriodEnd).toLocaleDateString('de-DE') : "-"}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                   {deleteConfirmId === user.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setDeleteConfirmId(null)} className="text-[9px] font-black uppercase px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">Abbrechen</button>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        disabled={isPending}
                        className="text-[9px] font-black uppercase px-3 py-1.5 bg-red-600 text-white rounded-lg flex items-center gap-1"
                      >
                        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserX className="w-3 h-3" />}
                        Löschen
                      </button>
                    </div>
                   ) : (
                    <button 
                      onClick={() => setDeleteConfirmId(user.id)}
                      className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}