export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 flex flex-col md:flex-row font-sans relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Sidebar Skeleton */}
      <aside className="hidden md:flex w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex-col z-40 sticky top-0 h-screen shadow-2xl">
        <div className="p-8 border-b border-slate-100/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-24 mx-4 mb-4"></div>
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
        </nav>

        <div className="p-6 border-t border-slate-100/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        {/* Header Skeleton */}
        <header className="h-24 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl flex items-center px-8 justify-between sticky top-0 z-30">
          <div>
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </header>

        {/* Settings Content Skeleton */}
        <div className="p-6 md:p-12 max-w-5xl mx-auto w-full space-y-8">
          {/* Language Preferences Skeleton */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-8">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-6"></div>
            <div className="flex gap-2">
              <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
              <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Security Section Skeleton */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-8">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-6"></div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse mt-6"></div>
          </div>

          {/* Notifications Section Skeleton */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-8">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <div className="flex-1">
                    <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>
                  <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone Skeleton */}
          <div className="bg-red-50/60 dark:bg-red-950/20 backdrop-blur-xl rounded-3xl border border-red-200/50 dark:border-red-900/50 p-8">
            <div className="h-6 w-32 bg-red-200 dark:bg-red-900 rounded-lg animate-pulse mb-6"></div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-5 w-48 bg-red-200 dark:bg-red-900 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-96 bg-red-200 dark:bg-red-900 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-red-200 dark:bg-red-900 rounded-xl animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-5 w-48 bg-red-200 dark:bg-red-900 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-96 bg-red-200 dark:bg-red-900 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-red-200 dark:bg-red-900 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <footer className="mt-auto p-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
