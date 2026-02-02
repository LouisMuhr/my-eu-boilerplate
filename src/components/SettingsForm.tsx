"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Shield,
  Globe,
  Bell,
  Loader2,
  Check,
  Lock,
  Mail,
  Sparkles,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

export default function SettingsForm() {
  const t = useTranslations("Settings");
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // State for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  // State for notifications
  const [notifications, setNotifications] = useState({
    marketing: false,
    updates: true,
    security: true,
  });
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("security.passwordMismatch"));
      return;
    }

    if (newPassword.length < 8) {
      toast.error(t("security.passwordTooShort"));
      return;
    }

    setLoadingPassword(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        toast.success(t("security.passwordUpdated"));
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        toast.error(data.error || t("security.passwordError"));
      }
    } catch (error) {
      toast.error(t("security.passwordError"));
    } finally {
      setLoadingPassword(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (locale: string) => {
    const newPathname = pathname.replace(/^\/(de|en)/, `/${locale}`);
    router.push(newPathname);
    router.refresh();
  };

  // Handle notification settings
  const handleNotificationChange = async (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    setLoadingNotifications(true);

    try {
      const res = await fetch("/api/notification-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...notifications, [key]: value }),
      });

      if (res.ok) {
        toast.success(t("notifications.saved"));
      }
    } catch (error) {
      toast.error("Error saving notification settings");
    } finally {
      setLoadingNotifications(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Language Switcher - Compact Design */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Globe className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">
                  {t("preferences.language")}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                  {t("preferences.languageDesc")}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange("de")}
                className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 ${
                  pathname.startsWith("/de")
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {pathname.startsWith("/de") && (
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
                )}
                🇩🇪 Deutsch
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 ${
                  pathname.startsWith("/en")
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {pathname.startsWith("/en") && (
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
                )}
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Switcher - Compact Design */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                  {mounted && theme === "dark" ? (
                    <Moon className="w-5 h-5 text-white" />
                  ) : mounted && theme === "light" ? (
                    <Sun className="w-5 h-5 text-white" />
                  ) : (
                    <Monitor className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>
              <div>
                <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">
                  {t("preferences.theme")}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                  {t("preferences.themeDesc")}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTheme("light")}
                disabled={!mounted}
                className={`relative px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                  mounted && theme === "light"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {mounted && theme === "light" && (
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                )}
                <Sun className="w-4 h-4" />
                <span className="hidden sm:inline">{t("preferences.light")}</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                disabled={!mounted}
                className={`relative px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                  mounted && theme === "dark"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {mounted && theme === "dark" && (
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                )}
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">{t("preferences.dark")}</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                disabled={!mounted}
                className={`relative px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                  mounted && theme === "system"
                    ? "bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {mounted && theme === "system" && (
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                )}
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">{t("preferences.system")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section - Premium Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Header with Pattern */}
          <div className="relative p-8 border-b border-slate-100/50 dark:border-slate-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-amber-500/5"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDIiIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-40"></div>
            <div className="relative flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-black uppercase tracking-tighter text-base text-slate-900 dark:text-white">
                  {t("security.title")}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                  {t("security.subtitle")}
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
                  {t("security.currentPassword")}
                </label>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
                  {t("security.newPassword")}
                </label>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
                  {t("security.confirmPassword")}
                </label>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="group/btn relative w-full h-14 overflow-hidden rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-orange-700 to-amber-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                {loadingPassword ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                )}
                {t("security.updatePassword")}
              </div>
            </button>
          </form>
        </div>
      </div>

      {/* Notifications Section - Premium Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Header */}
          <div className="relative p-8 border-b border-slate-100/50 dark:border-slate-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDIiIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-40"></div>
            <div className="relative flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-black uppercase tracking-tighter text-base text-slate-900 dark:text-white">
                  {t("notifications.title")}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                  {t("notifications.subtitle")}
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <Bell className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Marketing Emails */}
            <div className="group/item relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {t("notifications.marketing")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                      {t("notifications.marketingDesc")}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) =>
                      handleNotificationChange("marketing", e.target.checked)
                    }
                    className="sr-only peer"
                    disabled={loadingNotifications}
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </label>
              </div>
            </div>

            {/* Product Updates */}
            <div className="group/item relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {t("notifications.updates")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                      {t("notifications.updatesDesc")}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={notifications.updates}
                    onChange={(e) =>
                      handleNotificationChange("updates", e.target.checked)
                    }
                    className="sr-only peer"
                    disabled={loadingNotifications}
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </label>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="group/item relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {t("notifications.security")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                      {t("notifications.securityDesc")}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={notifications.security}
                    onChange={(e) =>
                      handleNotificationChange("security", e.target.checked)
                    }
                    className="sr-only peer"
                    disabled={loadingNotifications}
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
