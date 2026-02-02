import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
  Database,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Rocket,
  Code2,
  Mail,
  Bell,
  Shield,
  TrendingUp,
  Users,
  Star,
  Github,
  Terminal,
  Layers,
  Palette,
} from "lucide-react";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 text-slate-900 dark:text-slate-100 font-sans relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* --- NAVIGATION --- */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-all"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <span className="font-black text-lg">EU</span>
              </div>
            </div>
            <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
              Boilerplate
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-bold">
            <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-105">
              Features
            </a>
            <a href="#stack" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-105">
              Tech Stack
            </a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-105">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link
              href="/auth/signin"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:scale-105 transition-all"
            >
              Login
            </Link>
            <Link
              href="#pricing"
              className="group/btn relative inline-flex overflow-hidden rounded-xl transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2 px-6 py-2.5 text-white font-black text-sm">
                <Rocket className="w-4 h-4" />
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </div>
              <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Next.js 15 + Auth v5 Ready
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                Launch Your SaaS
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                EU-Compliant, Fast
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Stop wasting time on boilerplate code. Get a production-ready Next.js starter with
              <span className="font-black text-indigo-600 dark:text-indigo-400"> authentication, payments, GDPR compliance</span>,
              and everything you need to launch in days, not months.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <a
                href="#pricing"
                className="group/cta relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover/cta:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 px-8 py-5 text-white font-black text-base uppercase tracking-widest">
                  <Sparkles className="w-5 h-5" />
                  Get Boilerplate Now
                  <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                </div>
              </a>
              <a
                href="/dashboard"
                className="group/demo relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0 group-hover/demo:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 px-8 py-5 text-slate-900 dark:text-white font-black text-base uppercase tracking-widest border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
                  <Rocket className="w-5 h-5 group-hover/demo:rotate-12 transition-transform" />
                  View Live Demo
                </div>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="flex items-center gap-2 font-bold">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                One-time payment
              </div>
              <div className="flex items-center gap-2 font-bold">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                Full source code
              </div>
              <div className="flex items-center gap-2 font-bold">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                GDPR Ready
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES (BENTO GRID) --- */}
        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
              Everything You Need to Launch
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              No more "Hello World" tutorials. This is a production-ready setup that saves you weeks of development time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Feature 1 - Large */}
            <div className="lg:col-span-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl inline-flex">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">EU Compliance First</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Built for the European market. Pre-configured GDPR compliance, cookie consent banner,
                  privacy policy templates, imprint pages, and data export APIs. Launch without legal worries.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold">GDPR</span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold">Cookie Consent</span>
                  <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold">Legal Pages</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl inline-flex">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">Stripe Payments</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Ready-to-use Stripe integration for subscriptions and one-time payments. Webhooks configured.
                  Start earning from day one.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl inline-flex">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">NextAuth v5</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Latest NextAuth with email/password and OAuth (Google, GitHub). Email verification,
                  password reset, and protected routes via middleware.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl inline-flex">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">Drizzle ORM</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Type-safe database queries with Drizzle ORM and Turso (SQLite). Schema migrations,
                  relationships, and edge-ready.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl inline-flex">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">Email Ready</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Transactional emails with Resend. Beautiful templates for verification, password reset,
                  and notifications.
                </p>
              </div>
            </div>

            {/* Feature 6 - Large */}
            <div className="lg:col-span-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl inline-flex">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-6 mb-3 text-slate-900 dark:text-white">Next.js 15 Performance</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Built on Next.js 15 with App Router, Server Components, and Server Actions. TypeScript,
                  Tailwind CSS, and optimized for production. No bloat, just what you need.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-bold">App Router</span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold">TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-bold">Server Actions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CODE PREVIEW --- */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                Clean Code
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                Production-Ready Code
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Type-safe, well-structured, and easy to customize
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/20 via-zinc-500/20 to-stone-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-slate-900 dark:bg-slate-950 rounded-3xl border-2 border-slate-800/50 shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 text-slate-400 text-sm font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>src/app/api/auth/route.ts</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-8 overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code className="text-slate-300">
{`// Type-safe authentication with NextAuth v5
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}`}
                    </code>
                  </pre>
                </div>

                {/* Features List */}
                <div className="px-8 pb-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Type-safe
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Server Components
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-300 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Protected Routes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TECH STACK --- */}
        <section id="stack" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Tech Stack
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                Modern Stack for 2026
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: Globe, name: "Next.js 15", color: "from-slate-600 to-slate-800" },
                { icon: Database, name: "Drizzle ORM", color: "from-emerald-600 to-teal-600" },
                { icon: Palette, name: "Tailwind CSS", color: "from-cyan-600 to-blue-600" },
                { icon: CreditCard, name: "Stripe", color: "from-indigo-600 to-purple-600" },
                { icon: Lock, name: "NextAuth v5", color: "from-rose-600 to-pink-600" },
                { icon: Mail, name: "Resend", color: "from-orange-600 to-amber-600" },
                { icon: Shield, name: "Sentry", color: "from-violet-600 to-purple-600" },
                { icon: Terminal, name: "TypeScript", color: "from-blue-600 to-cyan-600" },
                { icon: Zap, name: "Turso DB", color: "from-green-600 to-emerald-600" },
                { icon: Github, name: "Git Ready", color: "from-slate-600 to-zinc-600" },
              ].map((tech, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-lg"
                       style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                  <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-slate-200/50 dark:border-slate-800/50 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:scale-105">
                    <div className="relative mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-xl blur-md opacity-50`}></div>
                      <div className={`relative p-3 bg-gradient-to-br ${tech.color} rounded-xl inline-flex`}>
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="font-black text-sm text-slate-900 dark:text-white">{tech.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SOCIAL PROOF --- */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                metric: "40+",
                label: "Hours Saved",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: Users,
                metric: "100%",
                label: "Code Ownership",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Star,
                metric: "EU",
                label: "GDPR Compliant",
                color: "from-amber-500 to-orange-500"
              },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur-xl"
                     style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 p-8 text-center">
                  <div className="relative mb-4 inline-flex">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-md opacity-50`}></div>
                    <div className={`relative p-4 bg-gradient-to-br ${stat.color} rounded-2xl`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.metric}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 font-bold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
              One Price. Everything Included.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Save 40+ hours of development for less than a freelancer's hourly rate
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

              {/* Popular Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-75"></div>
                  <div className="relative px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-white" />
                    Most Popular
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-600 dark:text-slate-400 mb-6 uppercase tracking-wider">
                    Lifetime License
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      €149
                    </span>
                    <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">
                      / once
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                    Get the code, build your project, keep 100% of revenue
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Complete Next.js 15 source code",
                    "NextAuth v5 authentication",
                    "Stripe subscription integration",
                    "Drizzle ORM + Turso database",
                    "GDPR-compliant legal pages",
                    "Email templates (Resend)",
                    "Sentry error monitoring",
                    "Cookie consent banner",
                    "Dark mode support",
                    "Lifetime updates",
                    "Priority Discord support",
                    "Commercial use license",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/auth/signin"
                  className="group/buy relative block w-full overflow-hidden rounded-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover/buy:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-2 h-16 text-white font-black text-base uppercase tracking-widest">
                    <Rocket className="w-5 h-5 group-hover/buy:translate-y-[-2px] transition-transform" />
                    Get Instant Access
                    <ArrowRight className="w-5 h-5 group-hover/buy:translate-x-1 transition-transform" />
                  </div>
                </a>

                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">Secure payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">14-day money-back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
                <div className="relative mb-8 inline-flex">
                  <div className="absolute inset-0 bg-white rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative p-6 bg-white/20 backdrop-blur-xl rounded-3xl border-2 border-white/30">
                    <Rocket className="w-16 h-16" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Ready to Launch Your SaaS?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Stop wasting time on setup. Get a production-ready boilerplate and start building
                  features that matter today.
                </p>

                <a
                  href="#pricing"
                  className="group/final inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-105 transition-all shadow-2xl"
                >
                  <Sparkles className="w-6 h-6" />
                  Get Started Now
                  <ArrowRight className="w-6 h-6 group-hover/final:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Features</a></li>
                <li><a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Pricing</a></li>
                <li><a href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/legal/privacy" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Privacy Policy</Link></li>
                <li><Link href="/legal/imprint" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Imprint</Link></li>
                <li><Link href="/legal/terms" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="https://github.com/louismuhr" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">GitHub</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Documentation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="https://github.com/louismuhr" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Twitter</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Discord</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm font-medium">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
                  EU
                </div>
              </div>
              <span className="font-black text-lg text-slate-900 dark:text-white">Boilerplate</span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              © 2026 EU Boilerplate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
