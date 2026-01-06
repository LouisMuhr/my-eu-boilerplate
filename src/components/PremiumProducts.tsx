// Datei: src/components/PremiumProduct.tsx

"use client";

import React from "react";
import { 
  Zap, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck,
  Code2,
  Cpu
} from "lucide-react";

interface PremiumProductProps {
  subscriptionStatus: string;
}

/**
 * Dies ist der Kern deines SaaS. 
 * Hier unterscheidest du zwischen "Zuschauer" (Free) und "Nutzer" (Pro).
 */
export default function PremiumProduct({ subscriptionStatus }: PremiumProductProps) {
  const isPro = subscriptionStatus === "active";

  if (!isPro) {
    return (
      <div className="relative group overflow-hidden bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] p-12 text-center transition-all hover:border-blue-500/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/20 pointer-events-none" />
        
        <div className="relative z-10 max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Premium Features gesperrt
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Werde Mitglied im Pro-Plan, um Zugriff auf die KI-Analyse, 
            Echtzeit-Metriken und den API-Export freizuschalten.
          </p>

          <div className="pt-6">
             <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto">
               Jetzt upgraden <Zap className="w-4 h-4 fill-white" />
             </button>
          </div>
        </div>

        {/* Blur Background für den "Anreiz" */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-600" /> 
            Pro-Workspace
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
            Willkommen im exklusiven Bereich. Deine Tools sind bereit.
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Cpu className="w-3 h-3" /> System Optimal
        </div>
      </div>

      {/* --- DAS ECHTE PRODUKT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Beispiel Tool 1: KI-Analyse */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-7 h-7" />
          </div>
          <h3 className="font-black text-xl mb-2">Echtzeit-Metriken</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Analysiere deine Marktdaten mit unserer proprietären Engine. 
            Keine Verzögerung, keine Limits.
          </p>
          <button className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:gap-4 transition-all">
            Konsole öffnen <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Beispiel Tool 2: API Management */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
            <Code2 className="w-7 h-7" />
          </div>
          <h3 className="font-black text-xl mb-2">API-Schnittstelle</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Integriere deine Workflows direkt via REST oder Webhooks. 
            Sicher verschlüsselt nach EU-Standards.
          </p>
          <button className="flex items-center gap-2 text-xs font-black text-purple-600 uppercase tracking-widest hover:gap-4 transition-all">
            API Keys verwalten <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Trust Banner für Pro Nutzer */}
      <div className="bg-gray-900 dark:bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col md:row justify-between items-center gap-6 overflow-hidden relative">
         <div className="relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Support-Priorität: Hoch</p>
           <h4 className="text-2xl font-black">Persönlicher Support aktiviert</h4>
           <p className="text-sm opacity-80 mt-1">Antwortgarantie innerhalb von 12 Stunden für Pro-Mitglieder.</p>
         </div>
         <button className="relative z-10 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
            Hilfe anfordern
         </button>
         <ShieldCheck className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12" />
      </div>
    </div>
  );
}