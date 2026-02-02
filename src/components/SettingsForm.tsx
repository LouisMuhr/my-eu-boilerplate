"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Shield,
  Globe,
  Palette,
  Bell,
  Loader2,
  Check,
  Lock,
  Mail,
} from "lucide-react";

export default function SettingsForm() {
  const t = useTranslations("Settings");
  const router = useRouter();
  const pathname = usePathname();

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
      {/* Security Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-red-50/30 to-transparent flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">
              {t("security.title")}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {t("security.subtitle")}
            </p>
          </div>
          <Shield className="w-5 h-5 text-red-600" />
        </div>

        <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                {t("security.currentPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                {t("security.newPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                {t("security.confirmPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingPassword}
            className="w-full h-12 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
          >
            {loadingPassword ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {t("security.updatePassword")}
          </button>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-indigo-50/30 to-transparent flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">
              {t("preferences.title")}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {t("preferences.subtitle")}
            </p>
          </div>
          <Palette className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="p-8 space-y-6">
          {/* Language Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-bold text-sm">{t("preferences.language")}</p>
                <p className="text-[10px] text-slate-400">
                  {t("preferences.languageDesc")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleLanguageChange("de")}
                className={`h-12 rounded-2xl font-bold text-sm transition-all ${
                  pathname.startsWith("/de")
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {t("preferences.german")}
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`h-12 rounded-2xl font-bold text-sm transition-all ${
                  pathname.startsWith("/en")
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {t("preferences.english")}
              </button>
            </div>
          </div>

          {/* Theme Selection - Placeholder for now */}
          <div className="space-y-4 opacity-50 pointer-events-none">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-bold text-sm">{t("preferences.theme")}</p>
                <p className="text-[10px] text-slate-400">
                  {t("preferences.themeDesc")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm">
                {t("preferences.light")}
              </button>
              <button className="h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm">
                {t("preferences.dark")}
              </button>
              <button className="h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm">
                {t("preferences.system")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-blue-50/30 to-transparent flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">
              {t("notifications.title")}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {t("notifications.subtitle")}
            </p>
          </div>
          <Bell className="w-5 h-5 text-blue-600" />
        </div>

        <div className="p-8 space-y-6">
          {/* Marketing Emails */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-sm">
                  {t("notifications.marketing")}
                </p>
                <p className="text-[10px] text-slate-400">
                  {t("notifications.marketingDesc")}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.marketing}
                onChange={(e) =>
                  handleNotificationChange("marketing", e.target.checked)
                }
                className="sr-only peer"
                disabled={loadingNotifications}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Product Updates */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-sm">{t("notifications.updates")}</p>
                <p className="text-[10px] text-slate-400">
                  {t("notifications.updatesDesc")}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.updates}
                onChange={(e) =>
                  handleNotificationChange("updates", e.target.checked)
                }
                className="sr-only peer"
                disabled={loadingNotifications}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Security Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-sm">
                  {t("notifications.security")}
                </p>
                <p className="text-[10px] text-slate-400">
                  {t("notifications.securityDesc")}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.security}
                onChange={(e) =>
                  handleNotificationChange("security", e.target.checked)
                }
                className="sr-only peer"
                disabled={loadingNotifications}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
