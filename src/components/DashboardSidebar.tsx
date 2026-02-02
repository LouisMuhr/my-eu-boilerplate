"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  ChevronRight,
  Sparkles,
  Star,
  X,
  Menu,
} from "lucide-react";
import { UserRow } from "@/lib/db-new";

interface DashboardSidebarProps {
  userRow: UserRow | null;
}

export default function DashboardSidebar({ userRow }: DashboardSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button - Fixed Position */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden h-11 w-11 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-700"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen
          w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
          border-r border-slate-200/50 dark:border-slate-800/50
          flex flex-col z-40 shadow-2xl shadow-slate-200/20 dark:shadow-none
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Section with Animation */}
        <div className="p-8 border-b border-slate-100/50 dark:border-slate-800/50">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/50 transition-all group-hover:scale-110 group-hover:rotate-3">
                <Sparkles size={24} className="animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-2xl tracking-tighter leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EU Core
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1 flex items-center gap-1">
                <Star size={8} className="text-amber-400 fill-amber-400" />
                Premium Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4 flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent"></div>
            Navigation
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            onClick={closeMobileMenu}
            className={`
              group relative flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all overflow-hidden
              ${
                pathname === "/dashboard" || pathname.match(/^\/\w{2}\/dashboard$/)
                  ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"
              }
            `}
          >
            {pathname === "/dashboard" || pathname.match(/^\/\w{2}\/dashboard$/) ? (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            ) : null}
            <div className="flex items-center gap-3 relative z-10">
              <LayoutDashboard className="w-5 h-5" />
              <span>Übersicht</span>
            </div>
            {pathname === "/dashboard" || pathname.match(/^\/\w{2}\/dashboard$/) ? (
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            ) : null}
          </Link>

          {/* Settings Link */}
          <Link
            href="/dashboard/settings"
            onClick={closeMobileMenu}
            className={`
              group relative flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all overflow-hidden
              ${
                pathname.includes("/dashboard/settings")
                  ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"
              }
            `}
          >
            {pathname.includes("/dashboard/settings") ? (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            ) : null}
            <div className="flex items-center gap-3 relative z-10">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-all duration-500" />
              <span>Einstellungen</span>
            </div>
            {pathname.includes("/dashboard/settings") ? (
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            ) : null}
          </Link>
        </nav>

        {/* Enhanced User Card */}
        <div className="p-6 border-t border-slate-100/50 dark:border-slate-800/50">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {userRow?.name?.[0] || "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-sm font-bold truncate text-slate-900 dark:text-white">
                  {userRow?.name || "Nutzer"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {userRow?.email}
                </span>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
